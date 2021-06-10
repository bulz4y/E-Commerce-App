import store from '../../store/store';
import { clearError } from '../actions/actions';

export function closeErrorModal() {
    store.dispatch(clearError());
};