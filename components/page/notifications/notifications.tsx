"use client";
import React, { useEffect, useState } from "react";
const Notifications = () => {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    // Подключаемся к WebSocket-серверу
    const socket = new WebSocket("ws://localhost:3000/api/socket");

    // При успешном подключении регистрируем клиента
    socket.onopen = () => {
      console.log("WebSocket соединение установлено");
      // Отправляем уникальный ID клиента (например, userID)
      socket.send(JSON.stringify({ type: "register", userID: "yourUserID" }));
    };

    // Обрабатываем входящие сообщения
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Получено уведомление:", data.message);

      // Сохраняем сообщения в состоянии для отображения
      setMessages((prevMessages: any) => [...prevMessages, data.message]);
    };

    // Обработка ошибок
    socket.onerror = (error) => {
      console.error("WebSocket ошибка:", error);
    };

    // Закрываем соединение при размонтировании компонента
    return () => socket.close();
  }, []);
  return (
    <div className="">
      <div>
        <h2>Уведомления</h2>
        <ul>
          {messages.map((msg: any, index: any) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
