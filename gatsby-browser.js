require('prismjs/themes/prism-tomorrow.css')

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    'This blog\'s client assets have recently been updated. Reload to display the latest version?'
  )
  if (answer === true)
    window.location.reload()
}
