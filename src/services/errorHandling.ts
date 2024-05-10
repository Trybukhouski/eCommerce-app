export async function handleResponse(response: Response) {
  let responseData;
  try {
    // Пробуем распарсить как JSON, если не получается, читаем как текст
    responseData = await response.json();
  } catch (error) {
    // Если JSON не удался, возможно, это просто текст
    responseData = await response.text();
  }

  if (!response.ok) {
    // Подготовить сообщение об ошибке на основе полученных данных
    const errorMessage = responseData.message || responseData;
    console.error('Server error:', errorMessage);
    alert(errorMessage);
    throw new Error(errorMessage);
  }

  return responseData;
}

