export default function copyToClipboard(url) {
  const textarea = document.createElement('textarea')
  textarea.value = url
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  alert('복사가 완료되었습니다.')
  document.body.removeChild(textarea)
}
