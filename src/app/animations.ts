import {
  trigger,
  transition,
  style,
  animate,
  AnimationTriggerMetadata,
  state,
  group,
  query,
  animateChild,
} from '@angular/animations';

const defaultDuration = '100ms';
const defaultMinWidth = '50px';
const defaultMaxWidth = '200px';
const defaultMinFontSize = '20px';
const defaultMaxFontSize = '24px';

export function mainContentAnimation(
  animationDuration: string = defaultDuration,
  minWidth: string = defaultMinWidth,
  maxWidth: string = defaultMaxWidth
): AnimationTriggerMetadata {
  return trigger('onSideNavChange', [
    state(
      'close',
      style({
        'margin-left': minWidth,
      })
    ),
    state(
      'open',
      style({
        'margin-left': maxWidth,
      })
    ),
    transition('close => open', animate(`${animationDuration} ease-in`)),
    transition('open => close', animate(`${animationDuration} ease-out`)),
  ]);
}
