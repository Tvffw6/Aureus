:root {
  --red: #e10600;
  --bg: #050505;
  --card: #0d0d0d;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background: radial-gradient(circle at top, #150000, #000);
  color: white;
}

/* TOPBAR */
.topbar {
  height: 70px;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0,0,0,0.7);
}

.logo {
  color: var(--red);
  font-weight: bold;
  font-size: 22px;
}

.nav-btn, .topbar button {
  background: var(--red);
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

/* HERO */
.hero {
  text-align: center;
  margin: 120px 0 60px;
}

.hero h1 {
  font-size: 46px;
}

/* AUTH */
.auth-box {
  width: 360px;
  margin: auto;
  background: var(--card);
  padding: 30px;
  border-radius: 12px;
}

/* INPUTS */
.field {
  position: relative;
  margin-bottom: 20px;
}

.field input {
  width: 100%;
  padding: 14px;
  background: transparent;
  border: 1px solid #500;
  color: white;
  border-radius: 8px;
}

.field label {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: #888;
  font-size: 14px;
  pointer-events: none;
  transition: 0.3s;
}

.field input:focus + label,
.field input:valid + label {
  top: -8px;
  background: var(--card);
  padding: 0 6px;
  font-size: 12px;
  color: var(--red);
}

/* BUTTONS */
button {
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  background: linear-gradient(135deg, var(--red), #700);
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
}

button.outline {
  background: transparent;
  border: 1px solid var(--red);
}

/* DASHBOARD */
.dashboard {
  display: flex;
  height: calc(100vh - 70px);
}

.sidebar {
  width: 240px;
  background: #080000;
  padding: 20px;
}

.sidebar button {
  margin-bottom: 10px;
}

.content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
}

.card {
  background: var(--card);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.hidden {
  display: none;
}
