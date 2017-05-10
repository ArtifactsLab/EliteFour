pokemon = read.csv("pokemon.csv", header = T)

#--------Stats--------
pokemon_stats = read.csv("pokemon_stats.csv", header = T)
stats = read.csv("stats.csv", header = T)

pss = merge(pokemon_stats, stats, by.x = "stat_id",by.y = "id")
remove(pokemon_stats, stats)

# http://stackoverflow.com/questions/30592094/r-spreading-multiple-columns-with-tidyr
library(data.table)
pss = dcast(setDT(pss), pokemon_id ~ identifier, value.var = "base_stat")

pps = merge(pokemon, pss, by.x = "id", by.y = "pokemon_id")
remove(pss, pokemon)

#--------Types--------
types = read.csv("")

#--------Write--------
write.table(pps[c("identifier", "height", "weight")], file = "../clean/pokemon_clean.csv", sep = ",",
            col.names = c("name", "height", "weight"),
            row.names = F
)
