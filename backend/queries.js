
// list all techs and their requirements
const LIST_WHOLE_TECH_TREE = 'select tech.*, dependency.req from tech left join dependency on dependency.tech = tech.id order by tech.id';

// get a specific tech tree
const LIST_TECH_TREE = `
	with recursive tree as (
		select tech.*, dep.req, 0 as level
		from tech
		join dependency dep on dep.tech = tech.id
		where tech.id = #_TECH_ID_#
		
		union all
		
		select tech.*, dep.req, tree.level + 1 as level
		from tech
		join tree on tech.id = tree.req
		left join dependency dep on dep.tech = tech.id
	)
    select * from tree`;

module.exports = {
	LIST_WHOLE_TECH_TREE,
	LIST_TECH_TREE
};