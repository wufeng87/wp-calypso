Dismissible Card
=========
This is a card component that can be dismissed for a single page load or be hidden
via user preference.

#### How to use:

```js
import DismissibleCard from 'blocks/dismissible-card';

render: function() {
  return (
    <div className="your-stuff">
      <DismissibleCard preferenceName="my-unique-preference-name">
        <span>Your stuff in a Card</span>
      </DismissibleCard>
    </div>
  );
}
```

## Props

Below is a list of supported props.

| Prop           | Type     | Required | default       | description
| -------------- | -------- | -------- | ------------  | -----------
| classname      | String   | No       | `undefined`   | Any addition classes to pass to the card component.
| onClick        | Function | No       | `lodash/noop` | This function will fire when a user clicks on the cross icon
| preferenceName | String   | Yes      | n/a           | The user preference name that we store a boolean against. Note that we prefix this value with 'dismissible-card-' to avoid namespace collisions.
| temporary      | Boolean  | No       | `undefined`   | When true, clicking on the cross will dismiss the card for the current page load.
