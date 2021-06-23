export let KeyboardDialogShow = true

const defaultRequestParams = {
  url: '',
  dataName: '',
  dataObject: {},
  params: {},
  method: 'POST',
  successCallback: () => {
  },
  failCallback: () => {
  }
}

const defaultKeyboardDialogParams = {
  title: '',
  hint: '',
  show: false,
  canCancel: false,
  inputType: 'text',
  closeOnFail: false,
  request: defaultRequestParams

}

export function showDialog (
  options = defaultKeyboardDialogParams
) {
  console.log('dialogShow')
  openDialog()
}

function openDialog () {
  KeyboardDialogShow = true
}

function closeDialog () {
  KeyboardDialogShow = false
}

function toggleDialog () {
  KeyboardDialogShow = !KeyboardDialogShow
}

function dialogIsShowing () {
  return KeyboardDialogShow
}

export function use () {
  openDialog()
  closeDialog()
  toggleDialog()
  dialogIsShowing()
}
