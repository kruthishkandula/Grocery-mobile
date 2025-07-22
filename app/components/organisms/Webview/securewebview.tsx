import {forwardRef, Ref} from 'react';
import {WebView, WebViewProps} from 'react-native-webview';

export interface SecureWebViewProps extends WebViewProps {
	/**
	 * This fuction is not defined in `WebViewProps` but is still used and may be deprecated.
	 * @see {@link https://github.com/react-native-webview/react-native-webview/blob/v13.14.1/docs/Reference.md#react-native-webview-api-reference API reference}
	 */
	onReceivedSslError?: (event: any) => void;
	additionalOriginWhitelist?: string[];
}

const SecureWebView = forwardRef(
	(props: Omit<SecureWebViewProps, 'originWhitelist'>, ref: Ref<WebView>) => {
		const {additionalOriginWhitelist, ...rest} = props;
		return (
			<WebView
				originWhitelist={['https://*', ...(additionalOriginWhitelist ?? [])]}
				{...rest}
				ref={ref}
			/>
		);
	},
);

export {SecureWebView};
