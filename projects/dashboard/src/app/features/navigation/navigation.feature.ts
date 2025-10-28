import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.feature.html',
  styleUrl: './navigation.feature.scss',
  host: {
    '(document:keyup.arrowLeft)': 'navigate("left")',
    '(document:keyup.arrowRight)': 'navigate("right")'
  }
})
export class NavigationFeature {

  router = inject(Router);
  routes = this.router.config.filter(route => route.path !== '**' );

  navigate(direction: 'left' | 'right') {
   this.debounce( () => this.goToRoute(direction));
  }


  goToRoute(direction: 'left' | 'right') {

    const currentIndex = this.routes.findIndex(route => `/${route.path}` === this.router.url);
    const newIndex = direction === 'left' ? (currentIndex - 1 + this.routes.length) : (currentIndex + 1);
    const destination = this.routes[newIndex % this.routes.length].path;

    this.router.navigate([destination]);
  }

  
  private debounceTimer: number | undefined; 
  private debounce( action:() => void ) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => { action() }, 300);
  }
  

}



  // this.debounce(() => this.goToRoute(direction));
  //this.goToRoute(direction);