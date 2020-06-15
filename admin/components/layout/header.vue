<template>
	<nav class="sidebar">
        <div class="sidebar-header">
            <a href="#" class="sidebar-brand">
		      Noble<span>UI</span>
		    </a>
            <div class="sidebar-toggler not-active">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="sidebar-body">
            <ul class="nav">
                <li class="nav-item nav-category">Main</li>
                <li class="nav-item active">
                    <a href="https://www.nobleui.com/laravel/template/dark" class="nav-link">
                        <i class="link-icon" data-feather="box"></i>
                        <span class="link-title">Dashboard</span>
                    </a>
                </li>
                <li class="nav-item nav-category">web apps</li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#email" role="button" aria-expanded="false" aria-controls="email">
                        <i class="link-icon" data-feather="mail"></i>
                        <span class="link-title">Email</span>
                        <i class="link-arrow" data-feather="chevron-down"></i>
                    </a>
                    <div class="collapse " id="email">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <a href="email/inbox.html" class="nav-link ">Inbox</a>
                            </li>
                            <li class="nav-item">
                                <a href="email/read.html" class="nav-link ">Read</a>
                            </li>
                            <li class="nav-item">
                                <a href="email/compose.html" class="nav-link ">Compose</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a href="apps/chat.html" class="nav-link">
                        <i class="link-icon" data-feather="message-square"></i>
                        <span class="link-title">Chat</span>
                    </a>
                </li>
                <li class="nav-item ">
                    <a href="apps/calendar.html" class="nav-link">
                        <i class="link-icon" data-feather="message-square"></i>
                        <span class="link-title">Calendar</span>
                    </a>
                </li>
                <li class="nav-item nav-category">Components</li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#uiComponents" role="button" aria-expanded="false" aria-controls="uiComponents">
                        <i class="link-icon" data-feather="feather"></i>
                        <span class="link-title">UI Kit</span>
                        <i class="link-arrow" data-feather="chevron-down"></i>
                    </a>
                    <div class="collapse " id="uiComponents">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <a href="ui-components/alerts.html" class="nav-link ">Alerts</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/badges.html" class="nav-link ">Badges</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/breadcrumbs.html" class="nav-link ">Breadcrumbs</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/buttons.html" class="nav-link ">Buttons</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/button-group.html" class="nav-link ">Button group</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/cards.html" class="nav-link ">Cards</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/collapse.html" class="nav-link ">Collapse</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/dropdowns.html" class="nav-link ">Dropdowns</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/list-group.html" class="nav-link ">List group</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/media-object.html" class="nav-link ">Media object</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/modal.html" class="nav-link ">Modal</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/navs.html" class="nav-link ">Navs</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/navbar.html" class="nav-link ">Navbar</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/pagination.html" class="nav-link ">Pagination</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/popovers.html" class="nav-link ">Popvers</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/progress.html" class="nav-link ">Progress</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/scrollbar.html" class="nav-link ">Scrollbar</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/scrollspy.html" class="nav-link ">Scrollspy</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/spinners.html" class="nav-link ">Spinners</a>
                            </li>
                            <li class="nav-item">
                                <a href="ui-components/tooltips.html" class="nav-link ">Tooltips</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#advanced-ui" role="button" aria-expanded="false" aria-controls="advanced-ui">
                        <i class="link-icon" data-feather="anchor"></i>
                        <span class="link-title">Advanced UI</span>
                        <i class="link-arrow" data-feather="chevron-down"></i>
                    </a>
                    <div class="collapse " id="advanced-ui">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <a href="advanced-ui/cropper.html" class="nav-link ">Cropper</a>
                            </li>
                            <li class="nav-item">
                                <a href="advanced-ui/owl-carousel.html" class="nav-link ">Owl Carousel</a>
                            </li>
                            <li class="nav-item">
                                <a href="advanced-ui/sweet-alert.html" class="nav-link ">Sweet Alert</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#forms" role="button" aria-expanded="false" aria-controls="forms">
                        <i class="link-icon" data-feather="inbox"></i>
                        <span class="link-title">Forms</span>
                        <i class="link-arrow" data-feather="chevron-down"></i>
                    </a>
                    <div class="collapse " id="forms">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <a href="forms/basic-elements.html" class="nav-link ">Basic Elements</a>
                            </li>
                            <li class="nav-item">
                                <a href="forms/advanced-elements.html" class="nav-link ">Advanced Elements</a>
                            </li>
                            <li class="nav-item">
                                <a href="forms/editors.html" class="nav-link ">Editors</a>
                            </li>
                            <li class="nav-item">
                                <a href="forms/wizard.html" class="nav-link ">Wizard</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#charts" role="button" aria-expanded="false" aria-controls="charts">
                        <i class="link-icon" data-feather="pie-chart"></i>
                        <span class="link-title">Charts</span>
                        <i class="link-arrow" data-feather="chevron-down"></i>
                    </a>
                    <div class="collapse " id="charts">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <a href="charts/apex.html" class="nav-link ">Apex</a>
                            </li>
                            <li class="nav-item">
                                <a href="charts/chartjs.html" class="nav-link ">ChartJs</a>
                            </li>
                            <li class="nav-item">
                                <a href="charts/flot.html" class="nav-link ">Flot</a>
                            </li>
                            <li class="nav-item">
                                <a href="charts/morrisjs.html" class="nav-link ">MorrisJs</a>
                            </li>
                            <li class="nav-item">
                                <a href="charts/peity.html" class="nav-link ">Peity</a>
                            </li>
                            <li class="nav-item">
                                <a href="charts/sparkline.html" class="nav-link ">Sparkline</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#tables" role="button" aria-expanded="false" aria-controls="tables">
                        <i class="link-icon" data-feather="layout"></i>
                        <span class="link-title">Tables</span>
                        <i class="link-arrow" data-feather="chevron-down"></i>
                    </a>
                    <div class="collapse " id="tables">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <a href="tables/basic-tables.html" class="nav-link ">Basic Tables</a>
                            </li>
                            <li class="nav-item">
                                <a href="tables/data-table.html" class="nav-link ">Data Table</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#icons" role="button" aria-expanded="false" aria-controls="icons">
                        <i class="link-icon" data-feather="smile"></i>
                        <span class="link-title">Icons</span>
                        <i class="link-arrow" data-feather="chevron-down"></i>
                    </a>
                    <div class="collapse " id="icons">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <a href="icons/feather-icons.html" class="nav-link ">Feather Icons</a>
                            </li>
                            <li class="nav-item">
                                <a href="icons/flag-icons.html" class="nav-link ">Flag Icons</a>
                            </li>
                            <li class="nav-item">
                                <a href="icons/mdi-icons.html" class="nav-link ">Mdi Icons</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item nav-category">Pages</li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#general" role="button" aria-expanded="false" aria-controls="general">
                        <i class="link-icon" data-feather="book"></i>
                        <span class="link-title">Special Pages</span>
                        <i class="link-arrow" data-feather="chevron-down"></i>
                    </a>
                    <div class="collapse " id="general">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <a href="general/blank-page.html" class="nav-link ">Blank page</a>
                            </li>
                            <li class="nav-item">
                                <a href="general/faq.html" class="nav-link ">Faq</a>
                            </li>
                            <li class="nav-item">
                                <a href="general/invoice.html" class="nav-link ">Invoice</a>
                            </li>
                            <li class="nav-item">
                                <a href="general/profile.html" class="nav-link ">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a href="general/pricing.html" class="nav-link ">Pricing</a>
                            </li>
                            <li class="nav-item">
                                <a href="general/timeline.html" class="nav-link ">Timeline</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#auth" role="button" aria-expanded="false" aria-controls="auth">
                        <i class="link-icon" data-feather="unlock"></i>
                        <span class="link-title">Authentication</span>
                        <i class="link-arrow" data-feather="chevron-down"></i>
                    </a>
                    <div class="collapse " id="auth">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <a href="auth/login.html" class="nav-link ">Login</a>
                            </li>
                            <li class="nav-item">
                                <a href="auth/register.html" class="nav-link ">Register</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" data-toggle="collapse" href="#error" role="button" aria-expanded="false" aria-controls="error">
                        <i class="link-icon" data-feather="cloud-off"></i>
                        <span class="link-title">Error</span>
                        <i class="link-arrow" data-feather="chevron-down"></i>
                    </a>
                    <div class="collapse " id="error">
                        <ul class="nav sub-menu">
                            <li class="nav-item">
                                <a href="error/404.html" class="nav-link ">404</a>
                            </li>
                            <li class="nav-item">
                                <a href="error/500.html" class="nav-link ">500</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item nav-category">Docs</li>
                <li class="nav-item">
                    <a href="https://www.nobleui.com/laravel/documentation/docs.html" target="_blank" class="nav-link">
                        <i class="link-icon" data-feather="hash"></i>
                        <span class="link-title">Documentation</span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
module.exports = {
	mounted: function(){
		var body = $('body');
	    var mainWrapper = $('.main-wrapper');
	    var footer = $('footer');
	    var sidebar = $('.sidebar');
	    var navbar = $('.navbar').not('.top-navbar');

	    // Enable feather-icons with SVG markup
	    feather.replace();

	    // initializing bootstrap tooltip
	    $('[data-toggle="tooltip"]').tooltip();

	    // initialize clipboard plugin
	    if ($('.btn-clipboard').length) {
	      var clipboard = new ClipboardJS('.btn-clipboard');

	      // Enabling tooltip to all clipboard buttons
	      $('.btn-clipboard').attr('data-toggle', 'tooltip').attr('title', 'Copy to clipboard');

	      // initializing bootstrap tooltip
	      $('[data-toggle="tooltip"]').tooltip();

	      // initially hide btn-clipboard and show after copy
	      clipboard.on('success', function(e) {
	        e.trigger.classList.value = 'btn btn-clipboard btn-current'
	        $('.btn-current').tooltip('hide');
	        e.trigger.dataset.originalTitle = 'Copied';
	        $('.btn-current').tooltip('show');
	        setTimeout(function(){
	            $('.btn-current').tooltip('hide');
	            e.trigger.dataset.originalTitle = 'Copy to clipboard';
	            e.trigger.classList.value = 'btn btn-clipboard'
	        },1000);
	        e.clearSelection();
	      });
	    }


	    // Applying perfect-scrollbar 
	    if ($('.sidebar .sidebar-body').length) {
	      const sidebarBodyScroll = new PerfectScrollbar('.sidebar-body');
	    }
	    if ($('.content-nav-wrapper').length) {
	      const contentNavWrapper = new PerfectScrollbar('.content-nav-wrapper');
	    }

	    // Sidebar toggle to sidebar-folded
	    $('.sidebar-toggler').on('click', function(e) {
	      $(this).toggleClass('active');
	      $(this).toggleClass('not-active');
	      if (window.matchMedia('(min-width: 992px)').matches) {
	        e.preventDefault();
	        body.toggleClass('sidebar-folded');
	      } else if (window.matchMedia('(max-width: 991px)').matches) {
	        e.preventDefault();
	        body.toggleClass('sidebar-open');
	      }
	    });


	    // Settings sidebar toggle
	    $('.settings-sidebar-toggler').on('click', function(e) {
	      $('body').toggleClass('settings-open');
	    });

	    // Sidebar theme settings
	    $("input:radio[name=sidebarThemeSettings]").click(function() {
	      $('body').removeClass('sidebar-light sidebar-dark');
	      $('body').addClass($(this).val());
	     })


	    // sidebar-folded on large devices
	    function iconSidebar(e) {
	      if (e.matches) {
	        body.addClass('sidebar-folded');
	      } else {
	        body.removeClass('sidebar-folded');
	      }
	    }
	    var desktopMedium = window.matchMedia('(min-width:992px) and (max-width: 1199px)');
	    desktopMedium.addListener(iconSidebar);
	    iconSidebar(desktopMedium);


	    //  open sidebar-folded when hover
	    $(".sidebar .sidebar-body").hover(
	    function () {
	      if (body.hasClass('sidebar-folded')){
	        body.addClass("open-sidebar-folded");
	      }
	    },
	    function () {
	      if (body.hasClass('sidebar-folded')){
	        body.removeClass("open-sidebar-folded");
	      }
	    });

	  // close sidebar when click outside on mobile/table    
	    $(document).on('click touchstart', function(e){
	      e.stopPropagation();

	      // closing of sidebar menu when clicking outside of it
	      if (!$(e.target).closest('.sidebar-toggler').length) {
	        var sidebar = $(e.target).closest('.sidebar').length;
	        var sidebarBody = $(e.target).closest('.sidebar-body').length;
	        if (!sidebar && !sidebarBody) {
	        if ($('body').hasClass('sidebar-open')) {
	          $('body').removeClass('sidebar-open');
	        }
	        }
	      }
	    });

	    //Close other submenu in sidebar on opening any
	    $(".sidebar-body > .nav > .nav-item > a[data-toggle='collapse']").on("click", function () {
	      $(".sidebar-body > .nav > .nav-item").find('.collapse.show').collapse('hide');
	    });

	    // initializing popover
	    $('[data-toggle="popover"]').popover();

	    //checkbox and radios
	    $(".form-check label,.form-radio label").append('<i class="input-frame"></i>');
	}}
</script>