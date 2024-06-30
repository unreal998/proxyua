export default function transactionMenuHandlers(
  cbData,
  bot,
  message,
  userData,
  responceMessageAwaiting
) {
  if (userData.type === "admin") {
    responceMessageAwaiting.type = cbData.type;
    responceMessageAwaiting.lastRequestMessage = cbData.button;
    switch (cbData.button) {
      case proxyListMenu.EDIT:
        bot.sendMessage(message.chat.id, `Редагувати`, editProxyMenu);
        break;
      case proxyListMenu.REMOVE:
        bot.sendMessage(
          message.chat.id,
          `Ви впевнені що хочете видалити ${cbData.button}?`
        );
        break;
      case proxyListMenu.INFO:
        getProxyData(cbData.id).then((data) => {
          bot.sendMessage(
            message.chat.id,
            `
                        Адреса: ${data.address} \n
Логін: ${data.login} \n
Пароль: ${data.password} \n
Статус: ${data.status ? " 🟢" : " 🔴"}\n
${
  data.status
    ? ""
    : `Арендовано: ${data.rentedBy} \n
Кінець аренди ${new Date(data.rentEnd).toLocaleString()}`
}`,
            createBackToMenuMenu()
          );
        });
        break;
      case proxyListMenu.EDIT_LOGIN:
        bot.sendMessage(message.chat.id, `Введіть новий логін`);
        break;
      case proxyListMenu.EDIT_PASSWORD:
        bot.sendMessage(
          message.chat.id,
          `Ви впевнені що хочете видалити ${cbData.button}?`
        );
        break;
      case proxyListMenu.EDIT_ADDRESS:
        bot.sendMessage(
          message.chat.id,
          `Ви впевнені що хочете видалити ${cbData.button}?`
        );
        break;
      default:
        bot.sendMessage(message.chat.id, `Ви нажали кнопку: ${cbData.button}`);
    }
  } else {
    bot.sendMessage(message.chat.id, `У вас немає доступу для перегляду`);
  }
}
