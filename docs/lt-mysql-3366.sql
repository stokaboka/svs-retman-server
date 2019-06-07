
insert into `Descriptions` (
    description,
    `max`,
    `min`,
    part,
    phase,
    test)

select
    ld.`desc`,
    ld.v2,
    ld.v1,   
    ld.part,
    ld.phase,
    1 from
    la_description ld;