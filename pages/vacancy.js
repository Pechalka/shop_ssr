import { connect } from 'react-redux';
import InputText from './components/InputText';

const Vacancy = ({ contents }) => (
	<InputText html={contents['vacancy']} />
)

export default connect(
	state => ({
		contents: state.contents
	})
)(Vacancy);