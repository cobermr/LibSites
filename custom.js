//Accordions
$(document).ready(function () {

    $('.accordion').each(function () {

        const $accordion = $(this);
        const accordionId = $accordion.attr('id');

        // Skip accordions without IDs
        if (!accordionId) return;

        // Add data-bs-parent to all collapse panels
        $accordion.find('.accordion-collapse').each(function () {
            $(this).attr('data-bs-parent', '#' + accordionId);
        });

        // Create controls
        const $controls = $(`
            <div class="accordion-controls mb-2">
                <button type="button" class="btn btn-sm btn-outline-primary me-2 expand-all">
                    Expand All
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary collapse-all">
                    Collapse All
                </button>
            </div>
        `);

        // Insert controls before accordion
        $accordion.before($controls);

        // Expand All
        $controls.find('.expand-all').on('click', function () {

            // Temporarily remove data-bs-parent so multiple items can stay open
            $accordion.find('.accordion-collapse').removeAttr('data-bs-parent');

            $accordion.find('.accordion-collapse').each(function () {
                bootstrap.Collapse.getOrCreateInstance(this, {
                    toggle: false
                }).show();
            });

            $accordion.find('.accordion-button').removeClass('collapsed');
        });

        // Collapse All
        $controls.find('.collapse-all').on('click', function () {

            $accordion.find('.accordion-collapse').each(function () {
                bootstrap.Collapse.getOrCreateInstance(this, {
                    toggle: false
                }).hide();
            });

            $accordion.find('.accordion-button').addClass('collapsed');

            // Restore normal accordion behavior
            $accordion.find('.accordion-collapse').attr(
                'data-bs-parent',
                '#' + accordionId
            );
        });

    });

});
