// Mobil PWA Özellikleri

// Pull-to-refresh özelliği
class PullToRefresh {
    constructor() {
        this.startY = 0;
        this.currentY = 0;
        this.isRefreshing = false;
        this.threshold = 80;
        this.refreshElement = null;
        this.init();
    }

    init() {
        // Refresh indicator oluştur
        this.createRefreshIndicator();
        
        // Touch event'leri ekle
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
    }

    createRefreshIndicator() {
        this.refreshElement = document.createElement('div');
        this.refreshElement.className = 'pull-refresh-indicator';
        this.refreshElement.innerHTML = '⬇️ Yenilemek için çekin';
        this.refreshElement.style.cssText = `
            position: fixed;
            top: -60px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(253, 185, 18, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 0 0 15px 15px;
            font-weight: bold;
            font-size: 14px;
            z-index: 9999;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        document.body.appendChild(this.refreshElement);
    }

    handleTouchStart(e) {
        if (window.scrollY === 0) {
            this.startY = e.touches[0].pageY;
        }
    }

    handleTouchMove(e) {
        if (this.isRefreshing || window.scrollY > 0) return;

        this.currentY = e.touches[0].pageY;
        const pullDistance = this.currentY - this.startY;

        if (pullDistance > 0) {
            e.preventDefault();
            
            const progress = Math.min(pullDistance / this.threshold, 1);
            const translateY = Math.min(pullDistance * 0.5, 60);
            
            this.refreshElement.style.top = `${translateY - 60}px`;
            
            if (progress >= 1) {
                this.refreshElement.innerHTML = '↻ Bırakarak yenile';
                this.refreshElement.style.background = 'rgba(169, 4, 50, 0.9)';
            } else {
                this.refreshElement.innerHTML = '⬇️ Yenilemek için çekin';
                this.refreshElement.style.background = 'rgba(253, 185, 18, 0.9)';
            }
        }
    }

    handleTouchEnd(e) {
        if (this.isRefreshing) return;

        const pullDistance = this.currentY - this.startY;
        
        if (pullDistance > this.threshold) {
            this.refresh();
        } else {
            this.resetIndicator();
        }
    }

    refresh() {
        this.isRefreshing = true;
        this.refreshElement.innerHTML = '⟳ Yenileniyor...';
        this.refreshElement.style.background = 'rgba(169, 4, 50, 0.9)';
        this.refreshElement.style.top = '10px';

        // Sayfayı yenile
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    resetIndicator() {
        this.refreshElement.style.top = '-60px';
        this.refreshElement.innerHTML = '⬇️ Yenilemek için çekin';
        this.refreshElement.style.background = 'rgba(253, 185, 18, 0.9)';
    }
}

// Akıllı Link Açma Sistemi
class SmartLinkHandler {
    constructor() {
        this.appMappings = {
            // Sosyal Medya - Harici tarayıcıda aç
            'youtube.com': {
                scheme: 'youtube://',
                fallback: 'external'
            },
            'youtu.be': {
                scheme: 'youtube://',
                fallback: 'external'
            },
            'linkedin.com': {
                scheme: 'linkedin://',
                fallback: 'external'
            },
            'twitter.com': {
                scheme: 'twitter://',
                fallback: 'external'
            },
            'x.com': {
                scheme: 'twitter://',
                fallback: 'external'
            },
            'instagram.com': {
                scheme: 'instagram://',
                fallback: 'external'
            },
            'facebook.com': {
                scheme: 'fb://',
                fallback: 'external'
            },
            'whatsapp.com': {
                scheme: 'whatsapp://',
                fallback: 'external'
            },
            'telegram.org': {
                scheme: 'tg://',
                fallback: 'external'
            },
            'spotify.com': {
                scheme: 'spotify://',
                fallback: 'external'
            },
            'github.com': {
                scheme: 'github://',
                fallback: 'external'
            },
            
            // AI Uygulamaları - Çoğu henüz URL scheme desteklemiyor, harici tarayıcıda aç
            'chatgpt.com': {
                scheme: null,
                fallback: 'external'
            },
            'chat.openai.com': {
                scheme: null,
                fallback: 'external'
            },
            'gemini.google.com': {
                scheme: null,
                fallback: 'external'
            },
            'bard.google.com': {
                scheme: null,
                fallback: 'external'
            },
            'claude.ai': {
                scheme: null,
                fallback: 'external'
            },
            'chat.deepseek.com': {
                scheme: null,
                fallback: 'external'
            },
            'copilot.microsoft.com': {
                scheme: null,
                fallback: 'external'
            },
            'poe.com': {
                scheme: 'poe://',
                fallback: 'external'
            },
            'perplexity.ai': {
                scheme: null,
                fallback: 'external'
            },
            
            // İş Uygulamaları - Uygulama varsa aç, yoksa siteye git
            'notion.so': {
                scheme: 'notion://',
                fallback: 'external'
            },
            'notion.com': {
                scheme: 'notion://',
                fallback: 'external'
            },
            'slack.com': {
                scheme: 'slack://',
                fallback: 'external'
            },
            'discord.com': {
                scheme: 'discord://',
                fallback: 'external'
            },
            'discord.gg': {
                scheme: 'discord://',
                fallback: 'external'
            },
            'zoom.us': {
                scheme: 'zoomus://',
                fallback: 'external'
            },
            'teams.microsoft.com': {
                scheme: 'msteams://',
                fallback: 'external'
            },
            
            // Özel AI Uygulamaları (Gerçek scheme desteği olanlar)
            'character.ai': {
                scheme: null,
                fallback: 'external'
            },
            'janitorai.com': {
                scheme: null,
                fallback: 'external'
            },
            'replika.ai': {
                scheme: 'replika://',
                fallback: 'external'
            }
        };
        this.init();
    }

    init() {
        // Tüm linkleri dinle
        document.addEventListener('click', this.handleLinkClick.bind(this));
    }

    handleLinkClick(e) {
        const link = e.target.closest('a');
        if (!link || !link.href) return;

        // Sadece dashboard linklerini işle
        if (!link.classList.contains('link')) return;

        e.preventDefault();
        
        const domain = this.extractDomain(link.href);
        console.log(`🔗 Link tıklandı: ${domain} → ${link.href}`);
        
        this.openSmartLink(link.href);
    }

    openSmartLink(url) {
        const domain = this.extractDomain(url);
        const mapping = this.appMappings[domain];

        if (mapping) {
            if (mapping.fallback === 'external') {
                // Harici tarayıcıda aç (AI uygulamaları ve sosyal medya)
                this.openExternalBrowser(url);
            } else if (mapping.fallback === 'website') {
                // İş uygulamaları: Uygulama varsa uygulamada, yoksa siteye git
                this.tryAppThenWebsite(url, mapping.scheme);
            } else if (mapping.scheme && mapping.scheme !== null) {
                // Scheme varsa: Uygulama varsa uygulamada, yoksa harici tarayıcıda aç
                this.tryAppThenExternal(url, mapping.scheme);
            } else {
                // Scheme yoksa direkt harici tarayıcıda aç
                this.openExternalBrowser(url);
            }
        } else {
            // Varsayılan: PWA içinde aç
            this.openInPWA(url);
        }
    }

    extractDomain(url) {
        try {
            const domain = new URL(url).hostname.replace('www.', '');
            return domain;
        } catch (e) {
            return '';
        }
    }

    openExternalBrowser(url) {
        console.log(`🌐 Harici tarayıcıda açılıyor: ${url}`);
        // PWA'dan çıkarak harici tarayıcıda aç
        if (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
            // PWA modunda - yeni pencere aç (PWA session korunur)
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            // Normal tarayıcıda - yeni sekme aç
            window.open(url, '_blank');
        }
    }

    tryAppThenExternal(url, scheme) {
        // Haptic feedback ver
        hapticFeedback('light');
        
        // Önce uygulamayı dene
        const appUrl = this.convertToAppUrl(url, scheme);
        let appOpened = false;
        
        if (appUrl) {
            // App scheme'i ile açmayı dene - PWA session'ını koruyarak
            const visibilityHandler = () => {
                if (document.hidden) {
                    appOpened = true;
                    document.removeEventListener('visibilitychange', visibilityHandler);
                    console.log('Uygulama başarıyla açıldı!');
                }
            };
            
            document.addEventListener('visibilitychange', visibilityHandler);
            
            // PWA session'ını koruyarak app'i aç
            try {
                // Gizli iframe ile app scheme'i dene
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = appUrl;
                document.body.appendChild(iframe);
                
                // 2.5 saniye sonra kontrol et
                setTimeout(() => {
                    document.body.removeChild(iframe);
                    document.removeEventListener('visibilitychange', visibilityHandler);
                    
                    // Eğer uygulama açılmadıysa harici tarayıcıda aç
                    if (!appOpened && !document.hidden) {
                        console.log('Uygulama bulunamadı, harici tarayıcıda açılıyor...');
                        this.openExternalBrowser(url);
                    }
                }, 2500);
                
            } catch (e) {
                console.log('App scheme failed:', e);
                this.openExternalBrowser(url);
            }
        } else {
            // Direkt harici tarayıcıda aç
            this.openExternalBrowser(url);
        }
    }

    tryAppThenWebsite(url, scheme) {
        // Haptic feedback ver
        hapticFeedback('light');
        
        // Önce uygulamayı dene
        const appUrl = this.convertToAppUrl(url, scheme);
        let appOpened = false;
        
        if (appUrl) {
            // App scheme'i ile açmayı dene
            const startTime = Date.now();
            
            // Visibility change ile app açılma kontrolü
            const visibilityHandler = () => {
                if (document.hidden) {
                    appOpened = true;
                    document.removeEventListener('visibilitychange', visibilityHandler);
                }
            };
            
            document.addEventListener('visibilitychange', visibilityHandler);
            
            // App URL'sini dene - PWA session'ını koruyarak
            try {
                // Gizli iframe ile app scheme'i dene
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = appUrl;
                document.body.appendChild(iframe);
                
                // Iframe'i kısa süre sonra temizle
                setTimeout(() => {
                    if (iframe.parentNode) {
                        document.body.removeChild(iframe);
                    }
                }, 1000);
                
            } catch (e) {
                console.log('App scheme failed:', e);
            }
            
            // 2.5 saniye sonra kontrol et
            setTimeout(() => {
                document.removeEventListener('visibilitychange', visibilityHandler);
                
                // Eğer uygulama açılmadıysa (sayfa hala görünürse) siteye git
                if (!appOpened && !document.hidden) {
                    console.log('App not found, opening website...');
                    this.openWebsite(url);
                } else if (appOpened) {
                    console.log('App opened successfully!');
                }
            }, 2500);
        } else {
            // App URL oluşturulamazsa direkt siteye git
            this.openWebsite(url);
        }
    }

    openWebsite(url) {
        // PWA içinde mi yoksa normal tarayıcıda mı olduğumuzu kontrol et
        if (isPWAMode()) {
            // PWA modundaysa harici tarayıcıda aç
            this.openExternalBrowser(url);
        } else {
            // Normal tarayıcıdaysa yeni sekmede aç
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }

    convertToAppUrl(url, scheme) {
        try {
            const urlObj = new URL(url);
            
            // YouTube özel durumu
            if (scheme === 'youtube://') {
                const videoId = this.extractYouTubeVideoId(url);
                if (videoId) {
                    return `youtube://watch?v=${videoId}`;
                }
                return 'youtube://';
            }
            
            // LinkedIn özel durumu
            if (scheme === 'linkedin://') {
                return `linkedin://profile/${urlObj.pathname}`;
            }
            
            // Poe özel durumu (Gerçek scheme desteği var)
            if (scheme === 'poe://') {
                return 'poe://';
            }
            
            // Replika özel durumu (Gerçek scheme desteği var)
            if (scheme === 'replika://') {
                return 'replika://';
            }
            
            // Notion özel durumu
            if (scheme === 'notion://') {
                return `notion://www.notion.so${urlObj.pathname}`;
            }
            
            // Slack özel durumu
            if (scheme === 'slack://') {
                return `slack://open`;
            }
            
            // Discord özel durumu
            if (scheme === 'discord://') {
                return 'discord://';
            }
            
            // Zoom özel durumu
            if (scheme === 'zoomus://') {
                return 'zoomus://zoom.us/join';
            }
            
            // Microsoft Teams özel durumu
            if (scheme === 'msteams://') {
                return 'msteams://';
            }
            
            // Diğer uygulamalar için basit dönüşüm
            return scheme + urlObj.pathname + urlObj.search;
        } catch (e) {
            return scheme;
        }
    }

    extractYouTubeVideoId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    openInPWA(url) {
        // PWA içinde aç (iframe veya popup)
        window.open(url, '_blank');
    }
}

// PWA Session Recovery Sistemi
class PWASessionRecovery {
    constructor() {
        this.init();
    }
    
    init() {
        // Sayfa yüklendiğinde kontrol et
        window.addEventListener('load', this.checkPageState.bind(this));
        
        // Visibility change ile geri gelme kontrolü
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        
        // Page show event ile geri gelme kontrolü
        window.addEventListener('pageshow', this.handlePageShow.bind(this));
    }
    
    checkPageState() {
        // Eğer sayfa boşsa veya sadece beyaz ekran varsa
        if (document.body.children.length === 0 || 
            (document.body.textContent.trim() === '' && document.body.children.length < 3)) {
            console.log('Boş sayfa algılandı, index sayfasına yönlendiriliyor...');
            this.reloadToIndex();
        }
    }
    
    handleVisibilityChange() {
        if (!document.hidden && this.shouldRecover()) {
            console.log('PWA geri geldi, sayfa durumu kontrol ediliyor...');
            setTimeout(() => {
                this.checkPageState();
            }, 500);
        }
    }
    
    handlePageShow(event) {
        // Eğer sayfa cache'den geliyorsa ve boşsa
        if (event.persisted && this.shouldRecover()) {
            console.log('Cache\'den gelen sayfa boş, yenileniyor...');
            this.reloadToIndex();
        }
    }
    
    shouldRecover() {
        // PWA modunda ve ana sayfada değilsek recovery gerekli
        return isPWAMode() && (window.location.pathname === '/' || window.location.pathname === '/index.html');
    }
    
    reloadToIndex() {
        // Index sayfasına yönlendir
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
            window.location.href = '/';
        } else {
            // Aynı sayfadaysak reload et
            window.location.reload();
        }
    }
}

// Mobil özellikleri başlat
document.addEventListener('DOMContentLoaded', () => {
    // Sadece mobil cihazlarda pull-to-refresh etkinleştir
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
        new PullToRefresh();
    }
    
    // Akıllı link handler'ı her zaman başlat
    new SmartLinkHandler();
    
    // PWA session recovery sistemi başlat
    new PWASessionRecovery();
});

// PWA display mode algılama
function isPWAMode() {
    return window.navigator.standalone || 
           window.matchMedia('(display-mode: standalone)').matches ||
           window.matchMedia('(display-mode: fullscreen)').matches;
}

// Haptic feedback (destekleyen cihazlarda)
function hapticFeedback(type = 'light') {
    if (navigator.vibrate) {
        switch(type) {
            case 'light':
                navigator.vibrate(10);
                break;
            case 'medium':
                navigator.vibrate(20);
                break;
            case 'heavy':
                navigator.vibrate([30, 10, 30]);
                break;
        }
    }
}

// PWA durumunu console'da göster
console.log('PWA Mode:', isPWAMode());
console.log('Mobile Features Loaded ✓');
console.log('Smart Link Handler: AI/Sosyal medya uygulamaları harici tarayıcıda açılır');
console.log('PWA Session Recovery: Beyaz ekran koruması aktif'); 