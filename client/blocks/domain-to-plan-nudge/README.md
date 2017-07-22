Domain to Plan Nudge
=========
This is an upgrade nudge that targets users with a site that has a free plan
and a paid domain.

#### How to use:

```js

import DomainToPlanNudge from 'blocks/domain-to-plan-nudge';

render: function() {
  return (
    <div className="your-stuff">
      <DomainToPlanNudge />
    </div>
  );
}
```

## Props

Below is a list of supported props.

| Prop   | Type   | Required | default       | description
| ---    | ---    | ---      | ---           | -----------
| siteId | Number | No       | selected site | Check for the requirements above using this siteId, otherwise we default to the currently selected site.
