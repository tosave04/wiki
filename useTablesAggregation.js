import { useEffect, useState } from "react"

// Addition de valeurs dans tableaux doubles
// datas => liste de tableaux doubles [[[a,1],[b,1]], [[b,1],[c,1]], ...]
// sort => index de l'élément à trier
// index => index des valeurs à additionner
// Retourne un tableau double [[a,1], [b,2], [c,1]]
export const tablesAggregation = (datas = [], sort = 0, index = 1) => {
	if (sort === index) return []
	const datasClone = clone(datas)
	datasClone.push([])
	return datasClone
		.reduce((a, b) => {
			return a === []
				? b
				: a.reduce((data, element) => {
						const i = data.findIndex((e) => e[sort] === element[sort])
						i >= 0 ? (data[i][index] += element[index]) : data.push(element)
						return data
				  }, b)
		}, [])
		.sort((a, b) => a[sort].localeCompare(b[sort]))
}

// Utilisation de tablesAggregation dans composant
// datas => liste de tableaux [state1, state2, ...]
export default function useTablesAggregation(datas = [], sort = 0, index = 1) {
	const [datasClone] = useState(clone(datas))
	const [data, setData] = useState()

	useEffect(() => {
		setData(tablesAggregation(datasClone, sort, index))
	}, [datasClone, index, sort])

	return data
}

// Clonage de données
const clone = (data) => JSON.parse(JSON.stringify(data))
