/**
 * This handles with the group management. 
 * Each agent that will load, will belong to a group.
 */
class GroupsManager
{

    /**
     * * This is a group manager
     * @param groups the dictionary that contains all the groups that exists in the test set.
     */
    constructor(groups)
    {
        this.groups = groups;
    }

}

export {GroupsManager}
