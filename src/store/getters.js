const getters = {
	token: (state) => state.user.token,
	username: (state) => state.user.username,
	role: (state) => state.user.role,
	projectNo: (state) => state.info.projectNo,
	KeyNo: (state) => state.jbqk.KeyNo,
	BaseType: (state) => state.jbqk.BaseType,
	parcelId: (state) => state.hxx.parcelId,
	Locationno: (state) => state.hxx.Locationno,
	householdId: (state) => state.hxx.householdId,
	TypeName: (state) => state.zxxm.TypeName,
	ucodeValue(state) {
		var newVlue = JSON.parse(localStorage.getItem('ucodeValue'));
		return newVlue ? newVlue : state.info.ucodeValue
	}
}
export default getters
