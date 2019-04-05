#!/bin/sh

./node_modules/typeorm/cli.js query "DROP TABLE IF EXISTS svsbeginners.Dictionary, svsbeginners.Groups, svsbeginners.LessonStages, svsbeginners.migrations, svsbeginners.Phases, svsbeginners.Steps, svsbeginners.Users, svsbeginners.UsersGroups, svsbeginners.Cue, svsbeginners.UsersResults;"

./node_modules/typeorm/cli.js migration:run

exit 0
