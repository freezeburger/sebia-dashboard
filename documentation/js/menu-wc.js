'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">sebia-dashboard documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/UiModule.html" data-type="entity-link" >UiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UiModule-cbd6b3d66a671422117c5e9eb403fdd70a9282e6d2713df20fc4e422906a4a21b59fa3ebba6066bc14c37229be12544a243c5d2e39de6ad9831e5b3c10df2bd6"' : 'data-bs-target="#xs-components-links-module-UiModule-cbd6b3d66a671422117c5e9eb403fdd70a9282e6d2713df20fc4e422906a4a21b59fa3ebba6066bc14c37229be12544a243c5d2e39de6ad9831e5b3c10df2bd6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UiModule-cbd6b3d66a671422117c5e9eb403fdd70a9282e6d2713df20fc4e422906a4a21b59fa3ebba6066bc14c37229be12544a243c5d2e39de6ad9831e5b3c10df2bd6"' :
                                            'id="xs-components-links-module-UiModule-cbd6b3d66a671422117c5e9eb403fdd70a9282e6d2713df20fc4e422906a4a21b59fa3ebba6066bc14c37229be12544a243c5d2e39de6ad9831e5b3c10df2bd6"' }>
                                            <li class="link">
                                                <a href="components/ButtonUi.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonUi</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardUi.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardUi</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogUi.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogUi</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterUi.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterUi</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderUi.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderUi</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationUi.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationUi</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/App.html" data-type="entity-link" >App</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonUi.html" data-type="entity-link" >ButtonUi</a>
                            </li>
                            <li class="link">
                                <a href="components/CardUi.html" data-type="entity-link" >CardUi</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogUi.html" data-type="entity-link" >DialogUi</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterUi.html" data-type="entity-link" >FooterUi</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderUi.html" data-type="entity-link" >HeaderUi</a>
                            </li>
                            <li class="link">
                                <a href="components/HomePage.html" data-type="entity-link" >HomePage</a>
                            </li>
                            <li class="link">
                                <a href="components/ListPage.html" data-type="entity-link" >ListPage</a>
                            </li>
                            <li class="link">
                                <a href="components/NavigationFeature.html" data-type="entity-link" >NavigationFeature</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationUi.html" data-type="entity-link" >NotificationUi</a>
                            </li>
                            <li class="link">
                                <a href="components/ReviewPage.html" data-type="entity-link" >ReviewPage</a>
                            </li>
                            <li class="link">
                                <a href="components/ValidationPage.html" data-type="entity-link" >ValidationPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link" >NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReviewService.html" data-type="entity-link" >ReviewService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AnalysisRecord.html" data-type="entity-link" >AnalysisRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LogEntry.html" data-type="entity-link" >LogEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notification.html" data-type="entity-link" >Notification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Review.html" data-type="entity-link" >Review</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});