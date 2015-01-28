var BaseController = function($scope, DataStorage, $routeParams) {

    this.$scope = $scope;
    this.$scope.list_title = "Items list";
    this.$scope.detail_title = "Item detail";
    this.$scope.add_title = "New Item";
    this.$scope.empty_list_msg = "No items found";
    this.dataStorage = DataStorage;
    this.limit = 2;
    this.offset = 0;
    this.$scope.filters = $routeParams.filters;
    this.$scope.current_item = undefined;
    this.$scope.edit_current_item = undefined;
    this.$scope.model_add_item = new DataStorage();
    this.$scope.items = undefined;
    this._set_previous_to_disabled();
    this._set_next_to_enabled();
    this._set_current_wdw_to_view();
    this.get_items();
    
    this.$scope.search = _.bind(this.search, this);
    this.$scope.set_current_wdw_to_add = _.bind(this._set_current_wdw_to_add, this);
    this.$scope.update_current_item = _.bind(this.update_current_item, this);
    this.$scope.previous_page = _.bind(this.previous_page, this);
    this.$scope.next_page = _.bind(this.next_page, this);
    this.$scope.set_current_tab_to_profile = _.bind(this._set_current_tab_to_profile, this);
    this.$scope.set_current_tab_to_edit = _.bind(this._set_current_tab_to_edit, this);
    this.$scope.update_item = _.bind(this.update_item, this);
    this.$scope.get_edit_model = _.bind(this._get_edit_model, this);
    this.$scope.add_item = _.bind(this.add_item, this);

};


BaseController.prototype._get_items = function(){
    return this.dataStorage.query({"limit": this.limit,
                                   "offset": this.offset,
                                   "filters": this.$scope.filters});
};

BaseController.prototype._is_current_item_in_datas = function(datas){

    var res = false;
    if(this.$scope.current_item !== undefined && !_.isEmpty(this.$scope.current_item) ){
        for(var i=0; i<datas.length; i++){
            if(datas[i]._id.$oid === this.$scope.current_item._id.$oid){
                res = true;
                break;
            }
        }
    }
    return res;
};

BaseController.prototype.get_items = function(){
    var me = this;
    this._get_items().$promise.then(
        function(datas){
            me.$scope.items = datas;
            if(!me._is_current_item_in_datas(datas)){
                me.update_current_item(datas[0]);

            }
        },function(error){}
    )
};

BaseController.prototype._decrement_offset = function(){
    this.offset = this.offset - this.limit;
    if(this.offset === 0){
        this._set_previous_to_disabled();
    }
};

BaseController.prototype.next_page = function(){
    if(this.$scope.next_state === ""){
        this.offset = this.offset + this.limit;
        var me = this;
        var items = this._get_items().$promise.then(
            function(datas){
                if(datas.length > 0){
                    me.$scope.items = datas;
                    me.update_current_item(datas[0]);
                }else{
                    me._decrement_offset();
                    me._set_next_to_disabled();
                }
            }, function(error){});
        this._set_previous_to_enabled();
    }
};

BaseController.prototype.previous_page = function(){
    if(this.offset > 0){
        this._decrement_offset();
        this.get_items();
        this._set_next_to_enabled();
    }
};

BaseController.prototype.update_current_item = function(item){
    this.$scope.current_item = item;
    this.$scope.edit_current_item = angular.copy(item);
    this._set_current_wdw_to_view();
};

BaseController.prototype.search = function(){
    this.offset = 0;
    this.get_items();
    this._set_next_to_enabled();
};

BaseController.prototype.update_item = function(){
    var me = this;
    this.$scope.edit_current_item.$update(function(datas){
        me.update_current_item(datas);
        for(var i=0; i< me.$scope.items.length; i++){
            if(me.$scope.items[i]._id.$oid === datas._id.$oid){
                me.$scope.items[i] = datas;
                break;
            }
            
        }
        me._set_current_tab_to_profile();
    },function(error){});
};

BaseController.prototype.add_item = function(){
    var me = this;
    this.$scope.model_add_item.$save(function(datas){
        me.offset = 0;
        me.get_items(function(){
            me._set_current_wdw_to_view();
            me._set_next_to_enabled();
        },function(error){});
    },function(error){});
};

BaseController.prototype._set_previous_to = function(state){
    this.$scope.previous_state = state;
};

BaseController.prototype._set_previous_to_disabled = function(){
    this._set_previous_to("disabled");
};

BaseController.prototype._set_previous_to_enabled = function(){
    this._set_previous_to("");
};

BaseController.prototype._set_next_to = function(state){
    this.$scope.next_state = state;
};

BaseController.prototype._set_next_to_disabled = function(){
    this._set_next_to("disabled");
};

BaseController.prototype._set_next_to_enabled = function(){
    this._set_next_to("");
};

BaseController.prototype._set_current_tab_to = function(tab_name){
    this.$scope.current_tab = tab_name;
};

BaseController.prototype._set_current_tab_to_profile = function(){
    this._set_current_tab_to("profile");
};

BaseController.prototype._set_current_tab_to_edit = function(){
    this._set_current_tab_to("edit");
};

BaseController.prototype._set_current_wdw_to = function(wdw_name){
    this.$scope.current_wdw = wdw_name;
};

BaseController.prototype._set_current_wdw_to_view = function(){
    this._set_current_wdw_to("view");
    this._set_current_tab_to_profile();
};

BaseController.prototype._set_current_wdw_to_add = function(){
    this._set_current_wdw_to("add");
    this.$scope.current_item = {};
};

BaseController.prototype._get_edit_model = function(){
    var model = (this.$scope.current_wdw === "add") ? this.$scope.model_add_item: this.$scope.edit_current_item;
    return model;
};


