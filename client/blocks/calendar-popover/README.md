Calendar Popover
================

This component shows a Popover with a calendar inside.

Beyond combining Popover and PostSchedule, this component connects with the state-tree, so in this way timezone data related to the site configuration is propagated automatically.


## Usage

```es6
import Button from 'components/button';
import CalendarPopover from 'blocks/calendar-popover';

toggle = () => this.setState( { show: ! this.state.show } );

render() {
	return (
		<div>
			<Button
				ref="button"
				onClick={ this.toggle }
			>
				Show Popover
			</Button>

			<CalendarPopover
				context={ this.refs && this.refs.button }
				isVisible={ this.state.show }
			/>
		</div>
	);
}
```

## Props

The following props can be passed to the CalendarPopover component:

| Prop          | Type    | Required | default      | description
| ------------- | ------- | -------- | ------------ | -----------
| children      | Element | No       |
| gmtOffset     | Number  | Connect  | undefined    | The site's UTC offset.
| timezoneValue | String  | Connect  | undefined    | The site's timezone value, in the format of 'America/Araguaina (see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

#### Props propagated to the `<Popover />`

* `autoPosition`
* `closeOnEsc`
* `ignoreContext`
* `isVisible`
* `position`
* `rootClassName`
* `showDelay`
* `onClose`
* `onShow`

#### Props propagated to the `<PostSchedule />`

 * `events`
 * `selectedDay`
 * `siteId`
 * `onDateChange`
 * `onMonthChange`

