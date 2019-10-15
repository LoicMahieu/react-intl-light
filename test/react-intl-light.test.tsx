import * as React from 'react';
import { IntlProvider, FormattedMessage, FormattedHTMLMessage } from '../src';
import renderer from 'react-test-renderer';
import defineMessages from '../src/defineMessages';

describe('react-intl-light', () => {
  describe('FormattedMessage', () => {
    it('without any message', () => {
      const component = renderer.create(
        <IntlProvider locale="fr" defaultLocale="fr">
          <h1>
            <FormattedMessage id="foo" defaultMessage="bar" />
          </h1>
          <h1>
            <FormattedMessage id="foo" />
          </h1>
          <h1>
            <FormattedMessage id="foo2" defaultMessage="bar2">
              {message => <span>The message: {message}</span>}
            </FormattedMessage>
          </h1>
          <h1>
            <FormattedHTMLMessage
              id="foo3"
              defaultMessage="<span>hello world</span>"
            />
          </h1>
        </IntlProvider>
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
    it('without any message but defautlLocale is different', () => {
      const component = renderer.create(
        <IntlProvider locale="fr" defaultLocale="en">
          <h1>
            <FormattedMessage id="foo" defaultMessage="bar" />
          </h1>
          <h1>
            <FormattedMessage id="foo" />
          </h1>
          <h1>
            <FormattedMessage id="foo2" defaultMessage="bar2">
              {message => <span>The message: {message}</span>}
            </FormattedMessage>
          </h1>
          <h1>
            <FormattedHTMLMessage
              id="foo3"
              defaultMessage="<span>hello world</span>"
            />
          </h1>
        </IntlProvider>
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
    it('with some messages', () => {
      const component = renderer.create(
        <IntlProvider
          locale="fr"
          messages={{
            foo: 'bim',
            foo2: 'bim2',
            foo3: '<span>bim3</span>',
          }}
        >
          <h1>
            <FormattedMessage id="foo" defaultMessage="bar" />
          </h1>
          <h1>
            <FormattedMessage id="foo2" defaultMessage="bar2">
              {message => <span>The message: {message}</span>}
            </FormattedMessage>
          </h1>
          <h1>
            <FormattedHTMLMessage
              id="foo3"
              defaultMessage="<span>hello world</span>"
            />
          </h1>
        </IntlProvider>
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  describe('defineMessages', () => {
    it('works', () => {
      const messages = defineMessages({
        foo: {
          id: 'foo',
          defaultMessage: 'bar',
        },
      });

      expect(messages).toMatchSnapshot();
    });
  });
});
