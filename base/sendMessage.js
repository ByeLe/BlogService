module.exports = {
  send:function (res, status, showAlert, message) {
    const data = {
      status,
      showAlert,
      message
    }
    res.end(JSON.stringify(data))
  },
  sendWithData: function (res, status, showAlert, message, data) { 
    const send = {
      status,
      data,
      message,
      showAlert
    }
    res.end(JSON.stringify(send))
  }
}