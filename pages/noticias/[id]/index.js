import React from 'react';
import SinglePost from "../../../components/SinglePost";
import {getInitialPostProps} from "../../../utils/getInitialItemsProps";

const Post = props => (
	<SinglePost
		{...props}
	/>
);

Post.getInitialProps = getInitialPostProps('cdmx');

export default Post;
