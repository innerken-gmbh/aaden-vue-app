import hillo from 'hillo'

export async function getAllConsumeTypeList () {
  return (await hillo.get('Complex.php', {
    op: 'showAllConsumeTypeInfo'
  })).content
}

export async function getAllPaymentList () {
  return (await hillo.get('PayMethod.php', {
  })).content
}

export async function getAllConsumeTypeStatus () {
  return (await hillo.get('Orders.php', {
    op: 'showConsumeTypeStatusList'
  })).content
}

export async function sendBillDetailToEmail (email, data, orderId) {
  return await hillo.postWithUploadFile('Orders.php?op=sendCheckoutEmail', {
    email: email,
    file: data,
    orderId: orderId
  })
}
