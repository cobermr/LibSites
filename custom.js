//Accordions
document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.accordion').forEach(function (accordion) {
    const accordionId = accordion.id;
    if (!accordionId) return;

    // 1. Add data-bs-parent to each collapse div
    accordion.querySelectorAll('.accordion-collapse').forEach(function (collapse) {
      collapse.setAttribute('data-bs-parent', '#' + accordionId);
    });

    // 2. Create Expand All / Collapse All buttons
    const btnGroup = document.createElement('div');
    btnGroup.className = 'accordion-controls mb-2 d-flex gap-2';

    const expandBtn = document.createElement('button');
    expandBtn.type = 'button';
    expandBtn.className = 'btn btn-sm btn-outline-secondary';
    expandBtn.textContent = 'Expand All';

    const collapseBtn = document.createElement('button');
    collapseBtn.type = 'button';
    collapseBtn.className = 'btn btn-sm btn-outline-secondary';
    collapseBtn.textContent = 'Collapse All';

    btnGroup.appendChild(expandBtn);
    btnGroup.appendChild(collapseBtn);
    accordion.parentNode.insertBefore(btnGroup, accordion);

    // 3. Expand All
    expandBtn.addEventListener('click', function () {
      accordion.querySelectorAll('.accordion-collapse').forEach(function (collapse) {
        collapse.removeAttribute('data-bs-parent');
        bootstrap.Collapse.getOrCreateInstance(collapse, { toggle: false }).show();
      });
      setTimeout(function () {
        accordion.querySelectorAll('.accordion-collapse').forEach(function (collapse) {
          collapse.setAttribute('data-bs-parent', '#' + accordionId);
        });
      }, 400);
    });

    // 4. Collapse All
    collapseBtn.addEventListener('click', function () {
      accordion.querySelectorAll('.accordion-collapse').forEach(function (collapse) {
        bootstrap.Collapse.getOrCreateInstance(collapse, { toggle: false }).hide();
      });
    });

  });

});