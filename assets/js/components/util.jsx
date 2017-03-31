import { connect } from 'react-redux'

export function selectPage(C) {
    function select(state) {
        return {
            page: state.page
        }
    }
    return connect(select)(C)
}
