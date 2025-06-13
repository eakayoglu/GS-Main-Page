let deferredPrompt;

// PWA yükleme banner'ını yakala
window.addEventListener('beforeinstallprompt', (e) => {
  // Varsayılan banner'ı engelle
  e.preventDefault();
  deferredPrompt = e;
  
  // Kendi yükleme düğmemizi göster
  showInstallButton();
});

function showInstallButton() {
  // Install butonu oluştur
  const installButton = document.createElement('button');
  installButton.innerHTML = '📱 Uygulamayı Yükle';
  installButton.className = 'install-button';
  installButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #FDB912, #A90432);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    font-size: 14px;
    transition: all 0.3s ease;
  `;
  
  installButton.addEventListener('mouseenter', () => {
    installButton.style.transform = 'scale(1.05)';
    installButton.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
  });
  
  installButton.addEventListener('mouseleave', () => {
    installButton.style.transform = 'scale(1)';
    installButton.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
  });
  
  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      // Yükleme prompt'unu göster
      deferredPrompt.prompt();
      
      // Kullanıcının seçimini bekle
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('Kullanıcı PWA yüklemeyi kabul etti');
      } else {
        console.log('Kullanıcı PWA yüklemeyi reddetti');
      }
      
      deferredPrompt = null;
      installButton.remove();
    }
  });
  
  document.body.appendChild(installButton);
  
  // 10 saniye sonra butonu gizle
  setTimeout(() => {
    if (installButton.parentNode) {
      installButton.remove();
    }
  }, 10000);
}

// PWA yüklendiğinde
window.addEventListener('appinstalled', (evt) => {
  console.log('PWA başarıyla yüklendi');
  // Install butonunu gizle
  const installButton = document.querySelector('.install-button');
  if (installButton) {
    installButton.remove();
  }
}); 