# ZerakiAnalytics

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.13.

## Coding standards
### 1. Single Responsibility Principle (SRP)

The single-responsibility principle states that: A class or a function
should have one and only one reason to change, meaning that a class should have only one job.
By having single-responsibility components we keep the component small, readable, with a clear
input and output and easy to plug in somewhere else in the app.

With regards to the SRP, it is recommended that you do the following:

#### a) Do define one thing, such as a service or component, per file

This will offer the following advantages:
- One component per file makes it far easier to read, maintain, and avoid collisions with other team members in source control.
- One component per file avoids hidden bugs that often arise when combining components in a file where they may share variables, create unwanted closures, or unwanted coupling with dependencies.

**_Important: Consider limiting files to 400 lines of code_**

#### b) Small Functions
Small functions are easier to test, especially when they do one thing and serve one purpose.\
So, how small is a small function? According to the Angular team, a function should be at most 75 lines of code.\
To ensure that your function does not exceed the recommended limit, ensure that it does one and only one thing.\
Let's consider the following example extracted from the application. It can be found in ```create-evaluation.component.ts```.\
```typescript
    onSubmit() {
		this.submitted = true;
		if (this.evaluationForm.invalid) {
			return;
		}

		const {term, year} = this.evaluationForm.value;

		if (this.selectedAssessmentType == 1){
			const data = {
				classId: this.classId,
				term,
				year,
				maximumScore: 80
			};
			this.evaluationService.createExam(data).subscribe({
				next: (res: any) => {
					this.evaluationCreated(res.examId, 0);
				},
				error: (err) => {
					const message = this.translate.instant("evaluation.create.toastMessages.createExamError", { examName: err.error.response.message });
					this.toastService.error(message);
				}
			});
		}else {
			const data = {
				classId: this.classId,
				typeId: this.selectedEvaluationType,
				term,
				year,
				topicId: this.selectedTopic,
				competencyId: this.selectedCompetencyArea,
				maximumScore: 3
			};
			if (this.selectedEvaluationType == 2){
				data["projectTitle"] = this.projectTitle;
				data["maximumScore"] = 10;
			}
			this.evaluationService.createEvaluation(data).subscribe({
				next: (res: any) => {
					const evaluationId = res.evaluationId | res.projectId;

					this.evaluationCreated(evaluationId, data.typeId);
				},
				error: (err) => {
					const message = this.translate.instant("evaluation.create.toastMessages.createEvaluationError", { reason: err.error.response.message });
					this.toastService.error(message);
					// this.toastService.error( `Failed to create an evaluation. <br> <b>Reason:  ${err.error.response.message}</b>`);
				}
			});
		}
	}
```
From the above function, although it is less than 75 lines of code, it is hard to know what the function
does unless you go through it line by line. This is because it clearly does more than one thing
- It sets the submitted value to true and checks if a form to be submitted is valid
- It creates an exam if assessment type is equal to 1
- If assessment type is not equal to 1, it creates an evaluation

If we do a refactor of the same function by extracting blocks of code to be independent functions, we get the following
```typescript
  onSubmit() {
    this.submitted = true;
	if (this.evaluationForm.invalid) {
	  return;
	}
	this.createAssessment()
  }
	
  createAssessment(){
	const {term, year} = this.evaluationForm.value;

	if (this.selectedAssessmentType == 1){
	  this.createExam(term, year);
	}else {
	  this.createEvaluation(term, year)
	}
  }
```
By making functions small,
- We promote reuse
- We make it easier to read
- We make it easy to maintain/modify

> Long methods generally indicate that they are doing too many things.
> The method itself as a whole might be doing one thing, but inside it, there are a few other operations that
> could be happening. We can extract those methods into their own method and make them do one thing
> each and use them instead. \
> Long methods also have many drawbacks:
> - They are hard to read, understand and maintain.
> - They are prone to bugs, as changing one thing might affect a lot of other things in that method
> - They also make refactoring (which is a key thing in any application) difficult, e.t.c.

**_FUNCTIONS SHOULD DO ONE THING. THEY SHOULD DO IT WELL. THEY SHOULD DO IT ONLY._**
### 2. DRY - Do Not Repeat Yourself
If you find yourself copying the same code in different places in the codebase, you are
basically **REPEATING YOURSELF**. What you should do instead is extract the repeating code and use it in place of the repeated code.\
This means that in the event that we want to update code, we will do it in only one place.

> Having the same code in multiple places means that if we want to make a change to the logic in that code,
> we have to do it in multiple places. This makes it difficult to maintain and also is prone to bugs where we could
> miss updating it in all occurrences. It takes longer to make changes to the logic and testing it is a lengthy process as well.

### 3. Avoid logic in templates
If you have any sort of logic in your templates, even if it is a simple ```&&``` clause, it is good to extract it out into its component.\
For example:\
```status.component.html```
```angular2html
<!-- WRONG -->
<p *ngIf="role==='developer'"> Status: Developer </p>
```
```status.component.ts```
```typescript
// component
ngOnInit () 
    {
		this.role = 'developer';
	}
```
The above code should be refactored to:
```angular2html
<!--CORRECT -->
<p *ngIf="showDeveloperStatus"> Status: Developer </p>
```
```typescript
ngOnInit (): void {
    this.role = 'developer';
}

get showDeveloperStatus(){
  return this.role === 'developer'
}
```

### 4. Components
#### Component Selectors
Do use dashed-case or kebab-case for naming the element selectors of components, to keep element names consistent
with the specification for [Custom Elements](https://www.w3.org/TR/custom-elements). \
The following should be **Avoided**
```typescript
/* avoid */

@Component({
selector: 'addStudent',
templateUrl: './hero-button.component.html'
})
export class HeroButtonComponent {}
```
And selector to be named as below:
```typescript
@Component({
  selector: 'add-student',
  templateUrl: './hero-button.component.html'
})
export class HeroButtonComponent {}
```
#### Separating component class, CSS, and template
If the CSS or template is more than three lines, move CSS to a style file and HTMl to a template file.

```typescript
@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
}
```

#### Avoid aliasing inputs and outputs
Avoid ```input``` and ```output``` aliases except when it serves an important purpose

This is because giving two names for the same property(one private, one public) is inherently confusing. \
You should use an alias when the directive name is also an ```input``` property, and the directive name doesn't describe the property.\
Avoid:
```typescript
@Component({
  selector: 'custom-save-button',
  template: `<button type="button">{{label}}</button>`
})
export class HeroButtonComponent {
  // Pointless aliases
  @Output('buttonChangeEvent') btnChange = new EventEmitter<any>();
  @Input('labelAttribute') label: string;
}
```
Do this instead:
```typescript
@Component({
  selector: 'custom-save-button',
  template: `<button type="button" >{{label}}</button>`
})
export class HeroButtonComponent {
  // No aliases
  @Output() btnChange = new EventEmitter<any>();
  @Input() label = '';
}
```
# ZerakiAnalytics

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.13.

## Coding standards
### 1. Single Responsibility Principle (SRP)

The single-responsibility principle states that: A class or a function
should have one and only one reason to change, meaning that a class should have only one job.
By having single-responsibility components we keep the component small, readable, with a clear
input and output and easy to plug in somewhere else in the app.

With regards to the SRP, it is recommended that you do the following:

#### a) Do define one thing, such as a service or component, per file

This will offer the following advantages:
- One component per file makes it far easier to read, maintain, and avoid collisions with other team members in source control.
- One component per file avoids hidden bugs that often arise when combining components in a file where they may share variables, create unwanted closures, or unwanted coupling with dependencies.

**_Important: Consider limiting files to 400 lines of code_**

#### b) Small Functions
Small functions are easier to test, especially when they do one thing and serve one purpose.\
So, how small is a small function? According to the Angular team, a function should be at most 75 lines of code.\
To ensure that your function does not exceed the recommended limit, ensure that it does one and only one thing.\
Let's consider the following example extracted from the application. It can be found in ```create-evaluation.component.ts```.\
```typescript
    onSubmit() {
		this.submitted = true;
		if (this.evaluationForm.invalid) {
			return;
		}

		const {term, year} = this.evaluationForm.value;

		if (this.selectedAssessmentType == 1){
			const data = {
				classId: this.classId,
				term,
				year,
				maximumScore: 80
			};
			this.evaluationService.createExam(data).subscribe({
				next: (res: any) => {
					this.evaluationCreated(res.examId, 0);
				},
				error: (err) => {
					const message = this.translate.instant("evaluation.create.toastMessages.createExamError", { examName: err.error.response.message });
					this.toastService.error(message);
				}
			});
		}else {
			const data = {
				classId: this.classId,
				typeId: this.selectedEvaluationType,
				term,
				year,
				topicId: this.selectedTopic,
				competencyId: this.selectedCompetencyArea,
				maximumScore: 3
			};
			if (this.selectedEvaluationType == 2){
				data["projectTitle"] = this.projectTitle;
				data["maximumScore"] = 10;
			}
			this.evaluationService.createEvaluation(data).subscribe({
				next: (res: any) => {
					const evaluationId = res.evaluationId | res.projectId;

					this.evaluationCreated(evaluationId, data.typeId);
				},
				error: (err) => {
					const message = this.translate.instant("evaluation.create.toastMessages.createEvaluationError", { reason: err.error.response.message });
					this.toastService.error(message);
					// this.toastService.error( `Failed to create an evaluation. <br> <b>Reason:  ${err.error.response.message}</b>`);
				}
			});
		}
	}
```
From the above function, although it is less than 75 lines of code, it is hard to know what the function
does unless you go through it line by line. This is because it clearly does more than one thing
- It sets the submitted value to true and checks if a form to be submitted is valid
- It creates an exam if assessment type is equal to 1
- If assessment type is not equal to 1, it creates an evaluation

If we do a refactor of the same function by extracting blocks of code to be independent functions, we get the following
```typescript
  onSubmit() {
    this.submitted = true;
	if (this.evaluationForm.invalid) {
	  return;
	}
	this.createAssessment()
  }
	
  createAssessment(){
	const {term, year} = this.evaluationForm.value;

	if (this.selectedAssessmentType == 1){
	  this.createExam(term, year);
	}else {
	  this.createEvaluation(term, year)
	}
  }
```
By making functions small,
- We promote reuse
- We make it easier to read
- We make it easy to maintain/modify

> Long methods generally indicate that they are doing too many things.
> The method itself as a whole might be doing one thing, but inside it, there are a few other operations that
> could be happening. We can extract those methods into their own method and make them do one thing
> each and use them instead. \
> Long methods also have many drawbacks:
> - They are hard to read, understand and maintain.
> - They are prone to bugs, as changing one thing might affect a lot of other things in that method
> - They also make refactoring (which is a key thing in any application) difficult, e.t.c.

**_FUNCTIONS SHOULD DO ONE THING. THEY SHOULD DO IT WELL. THEY SHOULD DO IT ONLY._**
### 2. DRY - Do Not Repeat Yourself
If you find yourself copying the same code in different places in the codebase, you are
basically **REPEATING YOURSELF**. What you should do instead is extract the repeating code and use it in place of the repeated code.\
This means that in the event that we want to update code, we will do it in only one place.

> Having the same code in multiple places means that if we want to make a change to the logic in that code,
> we have to do it in multiple places. This makes it difficult to maintain and also is prone to bugs where we could
> miss updating it in all occurrences. It takes longer to make changes to the logic and testing it is a lengthy process as well.

### 3. Avoid logic in templates
If you have any sort of logic in your templates, even if it is a simple ```&&``` clause, it is good to extract it out into its component.\
For example:\
```status.component.html```
```angular2html
<!-- WRONG -->
<p *ngIf="role==='developer'"> Status: Developer </p>
```
```status.component.ts```
```typescript
// component
ngOnInit () 
    {
		this.role = 'developer';
	}
```
The above code should be refactored to:
```angular2html
<!--CORRECT -->
<p *ngIf="showDeveloperStatus"> Status: Developer </p>
```
```typescript
ngOnInit (): void {
    this.role = 'developer';
}

get showDeveloperStatus(){
  return this.role === 'developer'
}
```

### 4. Components
#### Component Selectors
Do use dashed-case or kebab-case for naming the element selectors of components, to keep element names consistent
with the specification for [Custom Elements](https://www.w3.org/TR/custom-elements). \
The following should be **Avoided**
```typescript
/* avoid */

@Component({
selector: 'addStudent',
templateUrl: './hero-button.component.html'
})
export class HeroButtonComponent {}
```
And selector to be named as below:
```typescript
@Component({
  selector: 'add-student',
  templateUrl: './hero-button.component.html'
})
export class HeroButtonComponent {}
```
#### Separating component class, CSS, and template
If the CSS or template is more than three lines, move CSS to a style file and HTMl to a template file.

```typescript
@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
}
```

#### Avoid aliasing inputs and outputs
Avoid ```input``` and ```output``` aliases except when it serves an important purpose

This is because giving two names for the same property(one private, one public) is inherently confusing. \
You should use an alias when the directive name is also an ```input``` property, and the directive name doesn't describe the property.\
Avoid:
```typescript
@Component({
  selector: 'custom-save-button',
  template: `<button type="button">{{label}}</button>`
})
export class HeroButtonComponent {
  // Pointless aliases
  @Output('buttonChangeEvent') btnChange = new EventEmitter<any>();
  @Input('labelAttribute') label: string;
}
```
Do this instead:
```typescript
@Component({
  selector: 'custom-save-button',
  template: `<button type="button" >{{label}}</button>`
})
export class HeroButtonComponent {
  // No aliases
  @Output() btnChange = new EventEmitter<any>();
  @Input() label = '';
}
```
