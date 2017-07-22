Calendar Button
===============

This component is used to display a calendar button. When it pressed, it shows a Popover with a calendar inside.

## Usage

```es6
import CalendarButton from 'blocks/calendar-button';

render() {
	return (
		<CalendarButton />
	);
}
```

## Props

| Prop            | Type    | Required | default      | description
| --------------- | ------- | -------- | ------------ | -----------
| children        | Element | No       | `undefined`  |
| icon            | String  | No       | `'calendar'` | If the component doesn't have children elements then an icon (Gridicon) will be rendered inside of this one.
| popoverPosition | String  | No       | `'bottom'`   | It defines the position of the Popover once it shows. This value is propagated to the `<Popover />` instance through of the `position` property.
| type            | String  | Yes      | `'button'`   | This property defines to this component as a `button`. You shouldn't change this it.

### Props propagated to the `<Popover />`

* `autoPosition`
* `closeOnEsc`
* `events`
* `ignoreContext`
* `isVisible`
* `rootClassName`
* `selectedDay`
* `showDelay`
* `siteId`

* `onClose`
* `onDateChange`
* `onMonthChange`
* `onShow`

### Props propagated to the `<CalendarPopover />`

* `selectedDay`: the date which will be shown initially
* `siteId`: Passing siteId the calendar will try to get values related with time zone.
* `onDateChange`: Function to be executed when the user selects a date.


## Examples

### As much simple as possible

```es6
import CalendarButton from 'blocks/calendar-button';

render() {
	const tomorrow = new Date( new Date().getTime() + 24 * 60 * 60 * 1000 );

	return (
		<CalendarButton
			selectedDay={ tomorrow }
			onDateChange={ this.setDate } />
	);
}
```

### Custom calendar icon

```es6
import CalendarButton from 'blocks/calendar-button';

render() {
	return (
		<CalendarButton icon="thumbs-up" />
	);
}
```

### Render using children property

```es6
import CalendarButton from 'blocks/calendar-button';

render() {
	return (
		<CalendarButton onDateChange={ this.setDate }>
			<a class="custom-content" href="#">Open Me!</a>
		</CalendarButton>
	);
}
```
