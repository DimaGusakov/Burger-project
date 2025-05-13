import { useState, useEffect } from 'react';
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '../../../Service/databaseApi';
import { useGetUserQuery } from '../../../Service/databaseApi';
import './Orders.scss';

export default function Orders() {
  const { data: allOrders = [], isLoading, isError } = useGetAllOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(null);
  const [error, setError] = useState(null);

  // При получении данных сортируем заказы по дате (новые вначале)
  useEffect(() => {
    if (allOrders && allOrders.length > 0) {
      const sortedOrders = [...allOrders].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      setOrders(sortedOrders);
    }
  }, [allOrders]);

  // Отфильтрованные заказы
  const filteredOrders = orders.filter(order => {
    // Фильтрация по статусу
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }
    
    // Фильтрация по поиску
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const orderId = order.id.toLowerCase();
      const userName = order.customerInfo.name.toLowerCase();
      
      return orderId.includes(searchLower) || userName.includes(searchLower);
    }
    
    return true;
  });

  // Функция для форматирования даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Функция для получения статуса на русском языке
  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Ожидает обработки';
      case 'processing': return 'Готовится';
      case 'completed': return 'Выполнен';
      case 'cancelled': return 'Отменен';
      default: return 'Неизвестный статус';
    }
  };

  // Функция для обновления статуса заказа
  const handleStatusChange = async (userId, orderId, newStatus) => {
    setStatusUpdating(`${userId}-${orderId}`);
    setError(null);
    
    try {
      await updateOrderStatus({
        userId,
        orderId,
        status: newStatus
      }).unwrap();
      
      // Обновляем локальное состояние
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId && order.userId === userId 
            ? { ...order, status: newStatus } 
            : order
        )
      );
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error);
      setError(`Не удалось обновить статус: ${error.message || 'неизвестная ошибка'}`);
    } finally {
      setStatusUpdating(null);
    }
  };

  // Компонент для отображения информации о пользователе
  const UserInfo = ({ userId }) => {
    const { data: userData, isLoading } = useGetUserQuery(userId, {
      skip: !userId
    });
    
    if (isLoading || !userData) {
      return <span>Загрузка данных...</span>;
    }
    
    return (
      <div className="user-info">
        <div className="user-name">{userData.name} {userData.lastName || ''}</div>
        <div className="user-phone">{userData.phone || 'Нет телефона'}</div>
        <div className="user-email">{userData.email || 'Нет email'}</div>
      </div>
    );
  };

  if (isLoading) return <div className="admin-orders-loading">Загрузка заказов...</div>;
  if (isError) return <div className="admin-orders-error">Ошибка при загрузке заказов</div>;

  return (
    <div className="admin-orders">
      <h1>Управление заказами</h1>
      
      {error && (
        <div className="admin-orders-error-message">
          {error}
          <button onClick={() => setError(null)} className="close-error">×</button>
        </div>
      )}
      
      <div className="admin-orders-filters">
        <div className="search-box">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Поиск по ID или имени"
            className="search-input"
          />
        </div>
        
        <div className="status-filter">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-select"
          >
            <option value="all">Все статусы</option>
            <option value="pending">Ожидает обработки</option>
            <option value="processing">Готовится</option>
            <option value="completed">Выполнен</option>
            <option value="cancelled">Отменен</option>
          </select>
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="admin-orders-empty">
          <p>Заказов не найдено</p>
        </div>
      ) : (
        <div className="admin-orders-table">
          <div className="admin-orders-header">
            <div className="order-id">ID заказа</div>
            <div className="order-date">Дата</div>
            <div className="order-customer">Клиент</div>
            <div className="order-delivery">Доставка</div>
            <div className="order-amount">Сумма</div>
            <div className="order-status-col">Статус</div>
            <div className="order-actions">Действия</div>
          </div>
          
          {filteredOrders.map(order => (
            <div key={`${order.userId}-${order.id}`} className="admin-order-row">
              <div className="order-id">#{order.id.slice(-6)}</div>
              <div className="order-date">{formatDate(order.date)}</div>
              <div className="order-customer">
                <UserInfo userId={order.userId} />
              </div>
              <div className="order-delivery">
                {order.deliveryType === 'delivery' ? (
                  <>
                    <div>Доставка</div>
                    <div className="delivery-address">
                      {order.customerInfo.address?.street}, эт. {order.customerInfo.address?.floor}
                    </div>
                  </>
                ) : 'Самовывоз'}
              </div>
              <div className="order-amount">{order.totalPrice}₽</div>
              <div className="order-status-col">
                <span className={`order-status status-${order.status}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              <div className="order-actions">
                <select 
                  className="status-change-select"
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      handleStatusChange(order.userId, order.id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                  disabled={statusUpdating === `${order.userId}-${order.id}`}
                >
                  <option value="">Изменить статус</option>
                  <option value="pending">Ожидает обработки</option>
                  <option value="processing">Готовится</option>
                  <option value="completed">Выполнен</option>
                  <option value="cancelled">Отменен</option>
                </select>
                
                <button 
                  className="view-order-btn"
                  onClick={() => {
                    // Сюда можно добавить функциональность просмотра деталей заказа
                  }}
                >
                  Детали
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 