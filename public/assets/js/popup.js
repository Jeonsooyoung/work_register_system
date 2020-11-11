// 팝업
Vue.component('popup', {
	props: ['show'],
	methods:  {
		close: function(e) {
			if (e == null || e.target.className.trim() == 'modal-wrapper') {
				this.$emit('update:show', false);
			}
		}
	},
	template : (
	    '<div v-if="show" class="modal-mask">'+
			'<div class="modal-wrapper" @click="close">'+
				'<div class="modal-container">'+
					'<div class="modal-header">'+
						'<h3 style="display:inline;">할일 추가/수정</h3>'+
						'<span class="modal-default-button" style="cursor:pointer" @click="close(null)"></span>'+
					'</div>'+
					'<div class="modal-body">'+
						'<slot></slot>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'
    )
});