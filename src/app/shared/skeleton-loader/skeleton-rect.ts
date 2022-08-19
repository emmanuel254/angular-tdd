import {Component, ElementRef, OnInit} from "@angular/core";

@Component({
	selector: "app-skeleton-rect",
	host: {
		'class': 'pulse'
	},
	template: ``,
	styles: [`
        :host {
            display: block;
            width: var(--skeleton-rect-width);
            height: var(--skeleton-rect-height);
            background: rgba(229, 229, 229, 0.42) no-repeat;
        }
	`]
})
export class SkeletonRectComponent implements OnInit{
	width!: string;
	height!: string;
	className!: string;

	constructor(private host: ElementRef<HTMLElement>) {
	}

	ngOnInit() {
		const host = this.host.nativeElement;

		if (this.className){
			host.classList.add(this.className)
		}

		host.style.setProperty('--skeleton-rect-width', this.width ?? '100%');
		host.style.setProperty('--skeleton-rect-height', this.height ?? '20px');
	}
}
