import React from "react";
import SinglePerson from "../../../components/SinglePerson";
import {getInitialPersonProps} from "../../../utils/getInitialItemsProps";

const Person = (props) => (
	<SinglePerson
		{...props}
	/>
);

Person.getInitialProps = getInitialPersonProps();

export default Person;
