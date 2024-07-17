"use server";

export async function sendPostRequest(input?: string) {
  const url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion";
  const data = {
    modelUri: `gpt://${process.env.X_FOLDER_ID}/yandexgpt-lite`,
    completionOptions: {
      stream: false,
      temperature: 0.1,
      maxTokens: "1000",
    },
    messages: [
      {
        role: "system",
        text: "сформеруй краткое саммери по событиям в crm-системе в 1 абзац. Важно поддержиавать хронологию событий от самых старых к новым. И представить это в вите истории",
      },
      {
        role: "user",
        text: input,
      },
    ],
  };
  try {
    const response = await fetch(url, {
      method: "POST", // Указываем метод POST
      headers: {
        "Content-Type": "application/json", // Устанавливаем заголовки
        Authorization: `Api-Key ${process.env.YA_API_KEY}`, // Добавьте любые другие заголовки, если необходимо
        "x-folder-id": `${process.env.X_FOLDER_ID}`,
      },
      body: JSON.stringify(data), // Преобразуем тело запроса в JSON строку
    });

    // Проверяем, успешен ли запрос
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    // Преобразуем ответ в JSON
    const { result } = await response.json();
    return result.alternatives[0]; // Возвращаем результат
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error; // Пробрасываем ошибку для обработки выше по цепочке вызовов
  }
}
