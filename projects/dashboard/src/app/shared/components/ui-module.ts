import { NgModule } from '@angular/core';
import { ButtonUi } from './button/button.ui';
import { CardUi } from './card/card.ui';
import { DialogUi } from './dialog/dialog.ui';
import { FooterUi } from './footer/footer.ui';
import { HeaderUi } from './header/header.ui';
import { NotificationUi } from './notification/notification.ui';

@NgModule({
  imports:[ButtonUi, CardUi, DialogUi,FooterUi,HeaderUi,NotificationUi],
  exports:[ButtonUi, CardUi, DialogUi,FooterUi,HeaderUi,NotificationUi]
})
export class UiModule { }
