let available = [240, 360, 720]; /* Масив наявних значень */
let allowed = [360, 1080]; /* Масив дозволених значень */
let preferred = ['any', 720]; /* Масив бажаних значень */
let returns = []; /* Результат алгоритму */

function attempt() {
    let step_one = []; /* Результат першої перевірки */
    let step_two; /* Результат другої перевірки */
    let any_allowed = false;
    let any_preferred = false;

    for (let i = 0; i < available.length; i++) {
        for (let y = 0; y < allowed.length; y++) {              /* Перша перевірка */
            if (available[i] === allowed[y]) {
                step_one.push(available[i]);
                available.splice(i, 1);
            }else if(allowed[y] === "any"){
                any_allowed = true
            }
        }
    }

    if(any_allowed){
        for (let i = 0; i < available.length; i++) {
            for (let y = 0; y < preferred.length; y++) {        /* Перевіряємо, чи наявні значення які залишились містять бажані, якщо так - пушимо */
                if(available[i] === preferred[y]){
                    returns.push(available[i])
                }
            }
        }
    }

    if (step_one) {
        for (let z = 0; z < preferred.length; z++) {
            for (let j = 0; j < step_one.length; j++) {
                if (preferred[z] === step_one[j]) {
                    returns.push(preferred[z]);
                    preferred.splice(z, 1);
                }else if(preferred[z] === "any"){
                    any_preferred = true
                }
            }
        }

        if(any_preferred){
            for (let i = 0; i < step_one.length; i++) {
                for (let y = 0; y < allowed.length; y++) {        /* Перевіряємо, чи ,дозволені значення які залишились містять наявні, якщо так - пушимо */
                    if(step_one[i] !== allowed[y]){
                        for(let x = 0; x < returns.length; x++){
                            if(returns[x]!== step_one[i]){
                                returns.push(step_one[i])
                            }
                        }
                    }
                }
            }
        }

        if (returns.length === 0) {
            for (let i = 0; i < step_one.length; i++) {
                for (let j = 0; j < preferred.length; j++) {
                    if (step_one[i] > preferred[j]) {
                        step_two = step_one[i]
                    }
                }
            }                                                           /* Друга перевірка */

            if(!step_two){
                step_two = step_one[0];
                for(let i = 0; i < step_one.length; i++){
                    if(step_one[i+1] > step_one[i]){
                        step_two = step_one[i+1]
                    }
                }
            }

            returns.push(step_two)



        }

        console.log(returns);

    }

}

attempt();