import { useState, useEffect } from 'react';
import { auth } from '../../../firebase/firebase';
import { useGetOrdersQuery, useUpdateOrderStatusMutation, useDeleteOrderMutation } from '../../../Service/databaseApi';
import './Order.scss';

export default function Order() {
  const userId = auth.currentUser?.uid;
  const { data: ordersData, isLoading, isError } = useGetOrdersQuery(userId, {
    skip: !userId
  });
  
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [cancellingOrder, setCancellingOrder] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (ordersData) {
      // Преобразуем объект заказов в массив и сортируем по дате (новые вначале)
      const ordersArray = Object.values(ordersData).sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      setOrders(ordersArray);
    }
  }, [ordersData]);

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
  
  // Функция для отмены заказа
  const handleCancelOrder = async (orderId) => {
    if (!userId) return;
    
    setCancellingOrder(orderId);
    setActionError(null);
    
    try {
      await updateOrderStatus({
        userId,
        orderId,
        status: 'cancelled'
      }).unwrap();
      
      // Обновляем локальное состояние, чтобы не ждать повторного запроса данных
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: 'cancelled' } : order
        )
      );
    } catch (error) {
      console.error('Ошибка при отмене заказа:', error);
      setActionError(`Не удалось отменить заказ: ${error.message || 'неизвестная ошибка'}`);
    } finally {
      setCancellingOrder(null);
    }
  };
  
  // Функция для удаления заказа
  const handleDeleteOrder = async (orderId) => {
    if (!userId) return;
    
    // Если ещё не было подтверждения, запросить его
    if (confirmDelete !== orderId) {
      setConfirmDelete(orderId);
      return;
    }
    
    setDeletingOrder(orderId);
    setActionError(null);
    setConfirmDelete(null);
    
    try {
      await deleteOrder({
        userId,
        orderId
      }).unwrap();
      
      // Удаляем заказ из локального состояния
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Ошибка при удалении заказа:', error);
      setActionError(`Не удалось удалить заказ: ${error.message || 'неизвестная ошибка'}`);
    } finally {
      setDeletingOrder(null);
    }
  };
  
  // Отмена подтверждения удаления при клике не на тот заказ
  useEffect(() => {
    const handleClickOutside = () => {
      if (confirmDelete) {
        setConfirmDelete(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [confirmDelete]);
  
  // Проверка, можно ли отменить заказ
  const canCancelOrder = (status) => {
    return status === 'pending' || status === 'processing';
  };
  
  // Проверка, можно ли удалить заказ
  const canDeleteOrder = (status) => {
    return status === 'cancelled';
  };

  if (isLoading) return <div className="orders-loading">Загрузка заказов...</div>;
  if (isError) return <div className="orders-error">Ошибка при загрузке заказов</div>;

  return (
    <div className="orders">
      <h2>Мои заказы</h2>
      
      {actionError && (
        <div className="orders-error-message">
          {actionError}
          <button onClick={() => setActionError(null)} className="close-error">×</button>
        </div>
      )}
      
      {orders.length === 0 ? (
        <div className="orders-empty">
          <p>У вас пока нет заказов</p>
          <p className="orders-empty-suggestion">Оформите ваш первый заказ в меню</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Заказ #{order.id.slice(-6)}</h3>
                  <span className="order-date">{formatDate(order.date)}</span>
                </div>
                <div className="order-actions">
                  <div className={`order-status status-${order.status}`}>
                    {getStatusText(order.status)}
                  </div>
                  
                  {canCancelOrder(order.status) && (
                    <button 
                      className="cancel-order-btn"
                      onClick={() => handleCancelOrder(order.id)}
                      disabled={cancellingOrder === order.id}
                    >
                      {cancellingOrder === order.id ? 'Отмена...' : 'Отменить заказ'}
                    </button>
                  )}
                  
                  {canDeleteOrder(order.status) && (
                    <button 
                      className={`delete-order-btn ${confirmDelete === order.id ? 'confirm' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation(); // Предотвращаем всплытие, чтобы не сработал обработчик документа
                        handleDeleteOrder(order.id);
                      }}
                      disabled={deletingOrder === order.id}
                    >
                      {deletingOrder === order.id ? 'Удаление...' : 
                       confirmDelete === order.id ? 'Подтвердить удаление' : 'Удалить заказ'}
                    </button>
                  )}
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map(item => (
                  <div key={`${order.id}-${item.id}`} className="order-item">
                    <div className="item-info">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-weight">{item.weight}</p>
                      </div>
                    </div>
                    <div className="item-quantity-price">
                      <span className="item-quantity">{item.quantity} шт.</span>
                      <span className="item-price">{item.price * item.quantity}₽</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <div className="order-delivery-type">
                  <strong>Способ получения:</strong> {order.deliveryType === 'delivery' ? 'Доставка' : 'Самовывоз'}
                </div>
                
                {order.deliveryType === 'delivery' && (
                  <div className="order-address">
                    <strong>Адрес доставки:</strong> ул. {order.customerInfo.address.street}, 
                    эт. {order.customerInfo.address.floor}, 
                    дом. {order.customerInfo.address.intercom}
                  </div>
                )}
                
                <div className="order-total">
                  <strong>Итого:</strong> {order.totalPrice}₽
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 