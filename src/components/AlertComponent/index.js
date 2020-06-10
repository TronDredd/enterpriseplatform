import vue from 'vue'
import AlertComponent from './AlertComponent'


const AlertComponentConstructor = vue.extend(AlertComponent)

function showAlert(text, icon= 2,  duration = 2000) { //number = 2 默认是错误提示
    const alertComponent = new AlertComponentConstructor({
        el: document.createElement('div'),
        data() {
            return {
                text: text,
                show: true,
                showContent: true,
                icon: icon
            }
        }
    });
    document.body.appendChild(alertComponent.$el);
    setTimeout(() => {
        alertComponent.showContent = false;
    }, duration - 250);
    setTimeout(() => {
        alertComponent.show = false
    }, duration);
}

function registryAlertComponent() {
    vue.prototype.$alert = showAlert;
}

export {showAlert, registryAlertComponent};