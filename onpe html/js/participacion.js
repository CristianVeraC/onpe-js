const getResultados = async () => {
    const id = new URLSearchParams(window.location.search).get('id')
    const ubigeos = id.split('/')
        
        const bNacional = ubigeos[0] == 'Nacional'
        const aAmbito = [ ["Departamento", "Provincia", "Distrito"],[ "Continente", "Pais", "Ciudad"] ]
        let ambito = `Ambito : ${ubigeos[0]}`
        if ( ubigeos.length > 1 )ambito += `<br/> ${aAmbito[bNacional ? 0 : 1][0]} : ${ubigeos[1]}`
        if ( ubigeos.length > 2 )ambito += `<br/> ${aAmbito[bNacional ? 0 : 1][1]} : ${ubigeos[2]}`
        if ( ubigeos.length > 3 )ambito += `<br/> ${aAmbito[bNacional ? 0 : 1][2]} : ${ubigeos[3]}`
        document.getElementById('ambito').innerHTML = ambito

        if (ubigeos.length == 4) {
            document.getElementById('resultados_dpd').innerHTML = ""
            return
        }

        const data = await fetch(`https://oaemdl.es/onpe_sweb_php/participacion/${id}`)
        if ( data.status == 200 ) {
            const resultados = await data.json()
        
        let resultados_html = `
            <tr class="titulo_tabla">
                <td>${aAmbito[bNacional ? 0 : 1][ubigeos.length].toUpperCase()}</td>
                <td>TOTAL ASISTENTES</td>
                <td>% TOTAL ASISTENTES</td>
                <td>TOTAL AUSENTES</td>
                <td>% TOTAL AUSENTES</td>
                <td>ELECTORES HÁBILES</td>
            </tr>
        `
        

        resultados.forEach(resultado => {
            resultados_html += `
                <tr onclick="location.href='./participacion_total.html?id=${id}/${resultado.DPD}'" onmouseover="this.style.cursor = &quot;pointer&quot;; this.style.color = &quot;grey&quot;" onmouseout="this.style.color = &quot;black&quot;" style="cursor: pointer; color: black;">
                    <td>${resultado.DPD}</td>
                    <td>${resultado.TV}</td>
                    <td>${resultado.PTV}</td>
                    <td>${resultado.TA}</td>
                    <td>${resultado.PTA}</td>
                    <td>${resultado.EH}</td>
                </tr>
            `
        });

        resultados_html += `
            <tr>
                <td>TOTALES</td>
                <td>17,953,367</td>
                <td>81.543%</td>
                <td>4,063,663</td>
                <td>18.457%</td>
                <td>22,017,030</td>
            </tr>
        `
        document.getElementById('resultados').innerHTML = resultados_html
    }
    
    }

getResultados();
