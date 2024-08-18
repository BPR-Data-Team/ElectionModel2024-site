/* function resizeIframe() {
const iframe = document.getElementById('castFrame');
if (iframe) {
    iframe.style.height = (iframe.contentWindow.document.body.scrollHeight + 25) + 'px';
}
}

window.addEventListener('DOMContentLoaded', resizeIframe);
window.addEventListener('resize', resizeIframe);

const iframe = document.querySelector('iframe'); */


  function resizeIframe() {
    const iframe = document.getElementById('castFrame');
    if (iframe) {
        iframe.style.height = (iframe.contentWindow.document.body.scrollHeight + 25) + 'px';
    }
  }

  window.addEventListener('DOMContentLoaded', function() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      resizeIframe();  // Adjust height when DOM is fully loaded
      iframe.addEventListener('load', resizeIframe);  // Adjust height after iframe loads content
    }
  });

  window.addEventListener('resize', resizeIframe);  // Adjust height on window resize
