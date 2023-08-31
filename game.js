var camera, scene, renderer, material, maior = 0.1, menor = -0.1;
var maoIntersectsSphere = false; // Flag para indicar se a mão está colidindo com a esfera
var esferaAgarrada = false; // Flag para indicar se a esfera está agarrada pela mão
var esferaaAgarrada = false; // Flag para indicar se a esfera está agarrada pela mão
var contadorCaixaColeta = { vermelha: 0, verde: 0 }; // Contador de esferas na CaixaColeta
var contadorCaixaColetaa = { vermelha: 0, verde: 0 }; // Contador de esferas na CaixaColetaa


var gravity = 2.9; // Valor da gravidade
var sphereMass = 1; // Massa da esfera
var sphereeMass = 1; //massa da segunda esfera

init();

function init() {
    // Renderizador.
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    // Adicionando renderizador na tela
    document.body.appendChild(renderer.domElement);

    // Criando a câmera.
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

    camera.position.z = 300;
    camera.position.y = 50;


    // Criando a cena.
    scene = new THREE.Scene();

    // Criando o material.
    material = new THREE.MeshPhongMaterial();

    // Criando a primeira peça.
    var texturega = new THREE.TextureLoader().load('textures/metal.jpeg');
    var TorreMaterial = new THREE.MeshPhongMaterial({ map: texturega });
    var geometry = new THREE.BoxGeometry(20, 70, 20);
    const mesh = new THREE.Mesh(geometry, TorreMaterial);
    scene.add(mesh);
    this.mesh = mesh;

    mesh.position.x = 0;
    mesh.position.y = -10;
    mesh.position.z = 0;

    // Criando a segunda peça.
    var geometryy = new THREE.BoxGeometry(80, 10, 10);
    const meshh = new THREE.Mesh(geometryy, TorreMaterial);
    scene.add(meshh);
    this.meshh = meshh;

    meshh.position.x = 40;
    meshh.position.y = 0;
    meshh.position.z = 0;

    // Criando a terceira peça.
    var geomet = new THREE.BoxGeometry(10, 30, 10);
    const braco03 = new THREE.Mesh(geomet, TorreMaterial);
    scene.add(braco03);
    this.braco03 = braco03;

    braco03.position.x = 0;
    braco03.position.y = -20;
    braco03.position.z = 0;

    // Criando junta.
    const geometrry = new THREE.CylinderGeometry(10, 10, 10);
    const junta01 = new THREE.Mesh(geometrry, TorreMaterial);
    scene.add(junta01);
    this.junta01 = junta01;

    junta01.position.x = 0;
    junta01.position.y = 40;
    junta01.position.z = 0;

    // Criando junta.
    const junta02 = new THREE.Mesh(geometrry, TorreMaterial);
    scene.add(junta02);
    this.junta02 = junta02;

    junta02.position.x = 40;
    junta02.position.y = 0;
    junta02.position.z = 0;

    // Criando junta.
    const formaovo = new THREE.SphereGeometry(10, 10, 10);
    const mao = new THREE.Mesh(formaovo, TorreMaterial);
    scene.add(mao);
    this.mao = mao;

    mao.position.x = 0;
    mao.position.y = -10;
    mao.position.z = 0;

    // Criando a ligação.
    mesh.add(junta01);
    junta01.add(meshh);
    meshh.add(junta02);
    junta02.add(braco03);
    braco03.add(mao);

    // Criando luz na cena.


    var light = new THREE.AmbientLight(0x404040); // Soft white light.
    light.position.set(1, 0, 0).normalize();
    scene.add(light);

    // Direcionando a luz na cena.
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Adicionando o listener.
    window.addEventListener('resize', onWindowResize, false);

    // Adicionando listener para o teclado.
    document.body.addEventListener('keydown', keyPressed, false);

    // Adicionando o ground.
    var pisotexture = new THREE.TextureLoader().load('textures/granito.png');
    var groundGeometry = new THREE.PlaneGeometry(300, 300);
    var groundMaterial = new THREE.MeshPhongMaterial({ map: pisotexture });
    var ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -40;
    scene.add(ground);

    // Adicionando as esferas acima do ground.
    var bolatexture = new THREE.TextureLoader().load('textures/bolafut.jpeg');
    var sphereGeometry = new THREE.SphereGeometry(10, 10, 10);
    var sphereMaterial = new THREE.MeshPhongMaterial({ map: bolatexture });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 50;
    sphere.position.y = 100;
    sphere.position.z = 50;
    scene.add(sphere);
    this.sphere = sphere;
    this.sphereMaterial = sphereMaterial;

    var sphereeMaterial = new THREE.MeshPhongMaterial({ map: bolatexture });
    var spheree = new THREE.Mesh(sphereGeometry, sphereeMaterial);
    spheree.position.x = -50;
    spheree.position.y = 250;
    spheree.position.z = -50;
    scene.add(spheree);
    this.sphere = spheree;
    this.sphereMaterial = sphereeMaterial;

    //adicionando caixa de coleta
    var texture = new THREE.TextureLoader().load('textures/crate.gif');
    var MatColetor = new THREE.BoxGeometry(40, 40, 40);
    var CaixaColetaMaterial = new THREE.MeshPhongMaterial({ map: texture });
    const CaixaColeta = new THREE.Mesh(MatColetor, CaixaColetaMaterial);
    scene.add(CaixaColeta);
    this.CaixaColeta = CaixaColeta;

    CaixaColeta.position.x = -105;
    CaixaColeta.position.y = -19;
    CaixaColeta.position.z = 50;

    var CaixaColetaaMaterial = new THREE.MeshPhongMaterial({ map: texture});
    const CaixaColetaa = new THREE.Mesh(MatColetor, CaixaColetaaMaterial);
    scene.add(CaixaColetaa);
    this.CaixaColetaa = CaixaColetaa;

    CaixaColetaa.position.x = 105;
    CaixaColetaa.position.y = -19;
    CaixaColetaa.position.z = 50;


    // Função para atualizar a colisão entre a mão e a esfera.
    function updateCollision() {
        var maoBox = new THREE.Box3().setFromObject(mao);
        var sphereBox = new THREE.Box3().setFromObject(sphere);
        //segunda esfera
        var sphereeBox = new THREE.Box3().setFromObject(spheree);

        // Reduzindo o tamanho da bounding box da mão
        var maoBoxMin = maoBox.min.clone();
        var maoBoxMax = maoBox.max.clone();
        maoBoxMin.x += menor;
        maoBoxMin.y += menor;
        maoBoxMin.z += menor;
        maoBoxMax.x += maior;
        maoBoxMax.y += maior;
        maoBoxMax.z += maior;
        maoBox.setFromPoints([maoBoxMin, maoBoxMax]);
        
        // Reduzindo o tamanho da bounding box da esfera
        var sphereBoxMin = sphereBox.min.clone();
        var sphereBoxMax = sphereBox.max.clone();
        sphereBoxMin.x += menor;
        sphereBoxMin.y += menor;
        sphereBoxMin.z += menor;
        sphereBoxMax.x += maior;
        sphereBoxMax.y += maior;
        sphereBoxMax.z += maior;
        sphereBox.setFromPoints([sphereBoxMin, sphereBoxMax]);

        maoIntersectsSphere = maoBox.intersectsBox(sphereBox);

        if (maoIntersectsSphere) {
            sphereMaterial.color.set(0x0000ff); // Muda a cor da esfera quando há colisão.
        } else {
            sphereMaterial.color.set(0xff0000); // Volta à cor original da esfera.
        }

        //reduzindo o tamanho do bounding box da segunda esfera
        var sphereeBoxMin = sphereeBox.min.clone();
        var sphereeBoxMax = sphereeBox.max.clone();
        sphereeBoxMin.x += menor;
        sphereeBoxMin.y += menor;
        sphereeBoxMin.z += menor;
        sphereeBoxMax.x += maior;
        sphereeBoxMax.y += maior;
        sphereeBoxMax.z += maior;
        sphereeBox.setFromPoints([sphereeBoxMin, sphereeBoxMax]);

        //segunda
        maoIntersectsSpheree = maoBox.intersectsBox(sphereeBox);

        if (maoIntersectsSpheree) {
            sphereeMaterial.color.set(0x0000ff); // Muda a cor da esfera quando há colisão.
        } else {
            sphereeMaterial.color.set(0x00ff00); // Volta à cor original da esfera.
        }

    }

    // Função para renderizar a cena.
    function render() {
        updateCollision();

        if (esferaAgarrada) {
            // Atualiza a posição da esfera enquanto ela cai até o chão
            sphere.position.y = mao.position.y - 5; // Mantém a esfera sempre 10 unidades abaixo da mão
        } else {
            // Aplica os efeitos da gravidade na esfera
            if (sphere.position.y > -30) { // Verifica se a esfera está acima do chão
                sphere.position.y -= gravity * sphereMass; // Atualiza a posição da esfera aplicando a gravidade
            }
        }

        //updateCollision segnda
        if (esferaaAgarrada) {
            // Atualiza a posição da esfera enquanto ela cai até o chão
            spheree.position.y = mao.position.y - 5; // Mantém a esfera sempre 10 unidades abaixo da mão
        } else {
            // Aplica os efeitos da gravidade na esfera
            if (spheree.position.y > -30) { // Verifica se a esfera está acima do chão
                spheree.position.y -= gravity * sphereMass; // Atualiza a posição da esfera aplicando a gravidade
            }
        }

            //verifica se a esfera foi colocada dentro da caixa certa, se sim ela é enviada para o destino e
            //outra esfera entra na cena.
            
            if (sphere.position.distanceTo(CaixaColeta.position) < 25 && !mao.children.includes(sphere)) {
                scene.remove(sphere); // Remove a esfera da cena
                sphere.position.set(50, 100, 50); // Reposiciona a esfera para sua posição inicial
                scene.add(sphere); // Adiciona a esfera de volta à cena
                // Conte +1 esfera de cor tal na caixa tal
                contadorCaixaColeta.vermelha++; // Incrementa o contador da CaixaColeta para esferas vermelhas
                //contadorCaixaColeta.verde++; // Incrementa o contador da CaixaColeta para esferas vermelhas
            }
        
            if (spheree.position.distanceTo(CaixaColetaa.position) < 25 && !mao.children.includes(spheree)) {
                scene.remove(spheree); // Remove a esfera da cena
                spheree.position.set(-50, 250, -50); // Reposiciona a esfera para sua posição inicial
                scene.add(spheree); // Adiciona a esfera de volta à cena
                contadorCaixaColetaa.verde++; // Incrementa o contador da CaixaColetaa para esferas verdes
                // Conte +1 esfera de cor tal na caixa tal
            }
            
        
        renderer.render(scene, camera);
    }  


    // Função para redimensionar a tela.
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }

    // Função para tratar o teclado.
    function keyPressed(e) {
        switch (e.key) {
            case 'ArrowUp':
                junta01.rotateZ(0.1);
                break;
            case 'ArrowDown':
                junta01.rotateZ(-0.1);
                break;
            case '1':
                junta01.rotateY(-0.1);
                break;
            case '3':
                junta01.rotateY(0.1);
                break;
            case '8':
                junta02.rotateZ(0.1);
                break;
            case '2':
                junta02.rotateZ(-0.1);
                break;
            case '4':
                junta02.rotateY(-0.1);
                break;
            case '6':
                junta02.rotateY(0.1);
                break;
            case 'ArrowLeft':
                mesh.rotateY(-0.1);
                break;
            case 'ArrowRight':
                mesh.rotateY(0.1);
                break;
            case 'z':
            case 'Z':
                if (!esferaAgarrada && maoIntersectsSphere && esferaaAgarrada == false) {
                    mao.remove(sphere); // Remove a esfera do pai atual (cena)...
                    sphere.position.set(0, 0, 0); // Zera as coordenadas da esfera em relação à mão
                    sphere.translateX(1); // Ajusta a posição da esfera em relação à mão na coordenada x
                    mao.add(sphere); // Torna a esfera filha da mão
                    esferaAgarrada = true; // Marca a esfera como agarrada
                } else if (esferaAgarrada) {
                    var sphereWorldPosition = new THREE.Vector3();
                    sphere.getWorldPosition(sphereWorldPosition); // Obtém a posição global da esfera

                    mao.remove(sphere); // Remove a esfera do pai atual (mão)...
                    sphere.position.copy(sphereWorldPosition); // Mantém a posição global da esfera em relação à mão
                    scene.add(sphere); // ...e a torna filha da cena novamente
                    esferaAgarrada = false; // Marca a esfera como solta
                }
                //opções da segunda esfera
                if (!esferaaAgarrada && maoIntersectsSpheree && esferaAgarrada == false) {
                    mao.remove(spheree); // Remove a esfera do pai atual (cena)...
                    spheree.position.set(0, 0, 0); // Zera as coordenadas da esfera em relação à mão
                    spheree.translateX(1); // Ajusta a posição da esfera em relação à mão na coordenada x
                    mao.add(spheree); // Torna a esfera filha da mão
                    esferaaAgarrada = true; // Marca a esfera como agarrada
                } else if (esferaaAgarrada) {
                    var sphereeWorldPosition = new THREE.Vector3();
                    spheree.getWorldPosition(sphereeWorldPosition); // Obtém a posição global da esfera
    
                    mao.remove(spheree); // Remove a esfera do pai atual (mão)...
                    spheree.position.copy(sphereeWorldPosition); // Mantém a posição global da esfera em relação à mão
                    scene.add(spheree); // ...e a torna filha da cena novamente
                    esferaaAgarrada = false; // Marca a esfera como solta
                }
                break;
            case 'w':
                camera.position.y += 10;
                render();
                break;
            case 's':
                camera.position.y -= 10;
                render();
                break;
            case 'a':
                controls.rotateLeft(Math.PI / 6);
                render();
                break;
            case 'd':
                controls.rotateLeft(-Math.PI / 6);
                render();
                break;            
        }
        e.preventDefault();
        render();
    }

    // Função para animar a cena.
    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    animate();
}