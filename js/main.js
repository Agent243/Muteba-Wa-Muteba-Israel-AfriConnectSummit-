document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark/Light Mode
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // 2. Navbar & Menu Mobile
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // 3. Animations au scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Compte à rebours (Accueil)
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        const targetDate = new Date('Nov 15, 2026 09:00:00').getTime();
        setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            countdownEl.innerHTML = `${d}j ${h}h ${m}m`;
        }, 1000);
    }

    // 4. Onglets du programme
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`jour-${btn.dataset.day}`).classList.add('active');
        });
    });

    // 5. Filtrage dynamique (Intervenants)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const speakers = document.querySelectorAll('.speaker-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            speakers.forEach(speaker => {
                if (filter === 'all' || speaker.dataset.category === filter) {
                    speaker.style.display = 'block';
                } else {
                    speaker.style.display = 'none';
                }
            });
        });
    });

    // 6. Validation Formulaire
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (form.checkValidity()) {
                document.getElementById('success-msg').style.display = 'block';
                form.reset();
                setTimeout(() => document.getElementById('success-msg').style.display = 'none', 3000);
            }
        });
    }

    // 7. Bouton retour en haut
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) backToTop.style.display = 'block';
            else backToTop.style.display = 'none';
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 8. Année dynamique Footer
    document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

    // 9. Animation Compteur (Counter)
    const counters = document.querySelectorAll('.counter');

    const startCounting = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 secondes
            const startTime = Date.now();
            const startValue = 0;

            const animateCounter = () => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);
                const current = Math.floor(startValue + (target - startValue) * progress);
                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(animateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            animateCounter();
        });
    };

    // Trigger animation when stats section appears
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer2 = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = 'true';
                    startCounting();
                }
            });
        }, { threshold: 0.5 });
        observer2.observe(statsSection);
    }
    // Logique du mini-jeu
    const bubble = document.getElementById('target-bubble');
    const scoreDisplay = document.getElementById('score');
    const gameArea = document.getElementById('game-area');
    const welcomeScreen = document.getElementById('welcome-screen');
    const gameScreen = document.getElementById('game-screen');
    const playerNameInput = document.getElementById('player-name');
    const startGameBtn = document.getElementById('start-game-btn');
    const welcomeMessage = document.getElementById('welcome-message');

    if (bubble && scoreDisplay && gameArea && welcomeScreen && gameScreen && playerNameInput && startGameBtn && welcomeMessage) {
        let score = 0;
        let level = 1;
        const maxLevel = 10;
        const touchesParNiveau = 10;
        let gameStarted = false;
        let gameInterval;
        let playerName = '';

        const levelMessage = document.createElement('p');
        levelMessage.id = 'level-message';
        levelMessage.textContent = 'Niveau 1';
        gameArea.parentElement.insertBefore(levelMessage, gameArea.nextSibling);

        const setBubbleShape = () => {
            bubble.classList.remove('shape-square', 'shape-triangle', 'shape-rocket');
            if (level >= 5) {
                bubble.classList.add('shape-rocket');
            } else if (level >= 4) {
                bubble.classList.add('shape-triangle');
            } else if (level >= 3) {
                bubble.classList.add('shape-square');
            }
        };

        const showMilestone = (title, subtitle) => {
            const overlay = document.createElement('div');
            overlay.className = 'milestone-overlay';
            overlay.innerHTML = `<div class="milestone-card"><h2>${title}</h2><p>${subtitle}</p></div>`;
            document.body.appendChild(overlay);
            setTimeout(() => overlay.classList.add('show'), 20);
            setTimeout(() => {
                overlay.classList.remove('show');
                setTimeout(() => overlay.remove(), 600);
            }, 2200);
        };

        const triggerRocketBurst = () => {
            if (document.getElementById('rocket-layer')) return;
            const rocketLayer = document.createElement('div');
            rocketLayer.id = 'rocket-layer';
            document.body.appendChild(rocketLayer);

            for (let i = 0; i < 40; i++) {
                const rocket = document.createElement('span');
                rocket.className = 'rocket-piece';
                rocket.style.left = `${Math.random() * 100}%`;
                rocket.style.top = `${Math.random() * 100}%`;
                rocket.style.animationDelay = `${Math.random() * 0.2}s`;
                rocketLayer.appendChild(rocket);
            }

            setTimeout(() => rocketLayer.remove(), 1800);
        };

        const updateLevel = () => {
            const nextLevel = Math.min(Math.floor(score / touchesParNiveau) + 1, maxLevel);
            if (nextLevel !== level) {
                level = nextLevel;
                levelMessage.textContent = `Niveau ${level}`;
            }

            bubble.style.width = `${Math.max(40, 60 - (level - 1) * 2)}px`;
            bubble.style.height = `${Math.max(40, 60 - (level - 1) * 2)}px`;
            setBubbleShape();

            if (level === 1 && score === touchesParNiveau) {
                showMilestone('Félicitations', `${playerName || 'Joueur'} tu viens de terminer le premier palier ! Passons au niveau supérieur !`);
            }

            if (level >= 5) {
                triggerRocketBurst();
            }

            if (level >= maxLevel) {
                triggerConfetti();
            }
        };

        const triggerConfetti = () => {
            if (document.getElementById('confetti-layer')) return;

            const confettiLayer = document.createElement('div');
            confettiLayer.id = 'confetti-layer';
            document.body.appendChild(confettiLayer);

            for (let i = 0; i < 90; i++) {
                const piece = document.createElement('span');
                piece.className = 'confetti-piece';
                piece.style.left = `${Math.random() * 100}%`;
                piece.style.top = '-10px';
                piece.style.background = ['#f59e0b', '#38bdf8', '#f472b6', '#34d399', '#fef08a'][Math.floor(Math.random() * 5)];
                piece.style.animationDuration = `${2 + Math.random() * 3}s`;
                piece.style.animationDelay = `${Math.random() * 0.2}s`;
                confettiLayer.appendChild(piece);
            }

            setTimeout(() => {
                confettiLayer.remove();
            }, 3000);
        };

        const moveBubble = () => {
            const bubbleWidth = bubble.offsetWidth || 60;
            const bubbleHeight = bubble.offsetHeight || 60;
            const maxX = Math.max(0, gameArea.clientWidth - bubbleWidth);
            const maxY = Math.max(0, gameArea.clientHeight - bubbleHeight);
            const randomX = Math.floor(Math.random() * (maxX + 1));
            const randomY = Math.floor(Math.random() * (maxY + 1));

            bubble.style.left = `${randomX}px`;
            bubble.style.top = `${randomY}px`;
        };

        const startGame = () => {
            const pseudo = playerNameInput.value.trim();
            if (!pseudo) {
                playerNameInput.focus();
                return;
            }

            playerName = pseudo;
            welcomeScreen.classList.add('is-hidden');
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                gameScreen.hidden = false;
                gameScreen.classList.add('is-visible');
            }, 250);
            welcomeMessage.textContent = `Bienvenue à toi, ${pseudo} !`;
            showMilestone('Bienvenue', `Bienvenue à toi, ${pseudo} ! Prépare-toi à démarrer l'aventure.`);
            scoreDisplay.textContent = '0';
            score = 0;
            level = 1;
            levelMessage.textContent = 'Niveau 1';
            gameStarted = true;
            bubble.style.display = 'block';
            bubble.style.left = '50%';
            bubble.style.top = '50%';
            setBubbleShape();
            moveBubble();

            clearInterval(gameInterval);
            gameInterval = setInterval(moveBubble, 1500);
        };

        bubble.addEventListener('click', () => {
            if (!gameStarted) return;
            score++;
            scoreDisplay.textContent = score;
            updateLevel();
            moveBubble();
        });

        startGameBtn.addEventListener('click', startGame);
        playerNameInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                startGame();
            }
        });

        updateLevel();
        bubble.style.display = 'none';
    }
});