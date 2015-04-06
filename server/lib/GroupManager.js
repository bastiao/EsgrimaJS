/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */


class GroupManager{
    
    constructor()
    {
        this.groups = [];
        
    }
    
    add(group)
    {
        this.groups.add(group);
    }
    getAll(){
        return this.groups;
    }
    
}

var GroupManagerInstance = new GroupManager();

export {GroupManagerInstance}
