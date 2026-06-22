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
    expandBtn.className = 'btn btn-sm btn-outline-secondary ms-auto';
    expandBtn.textContent = 'Expand All';

    const collapseBtn = document.createElement('button');
    collapseBtn.type = 'button';
    collapseBtn.className = 'btn btn-sm btn-outline-secondary';
    collapseBtn.textContent = 'Collapse All';

    btnGroup.appendChild(expandBtn);
    btnGroup.appendChild(collapseBtn);
    accordion.parentNode.insertBefore(btnGroup, accordion);

    // 3. Expand All — bypass Bootstrap entirely to avoid data-bs-parent interference
    expandBtn.addEventListener('click', function () {
      accordion.querySelectorAll('.accordion-collapse').forEach(function (collapse) {
        // Destroy any existing Bootstrap instance so it doesn't interfere
        const instance = bootstrap.Collapse.getInstance(collapse);
        if (instance) instance.dispose();

        // Directly apply the open state classes
        collapse.classList.remove('collapse', 'collapsing');
        collapse.classList.add('collapse', 'show');
        collapse.style.height = '';
      });

      // Update button aria states
      accordion.querySelectorAll('.accordion-button').forEach(function (btn) {
        btn.classList.remove('collapsed');
        btn.setAttribute('aria-expanded', 'true');
      });
    });

    // 4. Collapse All — same approach, bypass Bootstrap
    collapseBtn.addEventListener('click', function () {
      accordion.querySelectorAll('.accordion-collapse').forEach(function (collapse) {
        const instance = bootstrap.Collapse.getInstance(collapse);
        if (instance) instance.dispose();

        collapse.classList.remove('show', 'collapsing');
        collapse.classList.add('collapse');
        collapse.style.height = '';
      });

      // Update button aria states
      accordion.querySelectorAll('.accordion-button').forEach(function (btn) {
        btn.classList.add('collapsed');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

  });

});