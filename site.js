const clock = document.querySelector('[data-clock]');
const updateClock = () => {
  if (!clock) return;
  const value = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
  clock.textContent = `${value} ist`;
};
updateClock();
setInterval(updateClock, 30000);

document.addEventListener('keydown', (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey || event.target.matches('input, textarea, select, button')) return;
  const routes = document.body.dataset.depth === 'child'
    ? { h: '../', o: '../open-source/', e: '../experience/', p: '../projects/', r: '../assets/vasu-kandagatla-resume.pdf' }
    : { h: './', o: 'open-source/', e: 'experience/', p: 'projects/', r: 'assets/vasu-kandagatla-resume.pdf' };
  const route = routes[event.key.toLowerCase()];
  if (route) window.location.href = route;
});


const filterButtons = [...document.querySelectorAll('[data-filter]')];
const contributions = [...document.querySelectorAll('[data-kind][data-state]')];
const emptyFilter = document.querySelector('[data-empty-filter]');

filterButtons.forEach((button) => button.addEventListener('click', () => {
  const group = button.dataset.group;
  document.querySelectorAll(`[data-group="${group}"]`).forEach((item) => item.classList.toggle('is-active', item === button));
  const type = document.querySelector('[data-group="type"].is-active')?.dataset.filter || 'all';
  const state = document.querySelector('[data-group="state"].is-active')?.dataset.filter || 'all';
  let visible = 0;
  contributions.forEach((item) => {
    const show = (type === 'all' || item.dataset.kind === type) && (state === 'all' || item.dataset.state === state);
    item.classList.toggle('is-hidden', !show);
    if (show) visible += 1;
  });
  emptyFilter?.classList.toggle('is-visible', visible === 0);
}));
