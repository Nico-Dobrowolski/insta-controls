// Fonction pour ajouter l'attribut controls à une vidéo
function addControlsToVideo(video) {
  if (!video.hasAttribute('controls')) {
    console.log('Ajout des contrôles à la vidéo :', video);
    video.setAttribute('controls', 'true');
    video.setAttribute('autoplay', 'true');
    video.setAttribute('controlslist', 'true');
    // Ajouter l'attribut volume à 50%
    video.addEventListener('loadedmetadata', function () {
      // Ajouter l'attribut volume à 0.5 après le chargement des métadonnées
      video.volume = 0.5;
    });

    // Vérifier et supprimer la div au même niveau que la vidéo (sibling)
    var siblingDiv = video.nextElementSibling;
    if (siblingDiv && siblingDiv.tagName === 'DIV') {
      siblingDiv.remove();
    }
  }
}

// Fonction pour observer les mutations dans le DOM
function handleMutation(mutation) {
  if (mutation.type === 'childList') {
    mutation.addedNodes.forEach(function (node) {
      // Si un nœud ajouté est une vidéo, ajouter les contrôles
      if (node.tagName === 'VIDEO') {
        addControlsToVideo(node);
      }
      // Si le nœud ajouté a des descendants vidéos, ajouter les contrôles à chacune
      else if (node.getElementsByTagName) {
        Array.from(node.getElementsByTagName('video')).forEach(
          addControlsToVideo
        );
      }
    });
  }
}

// Fonction pour observer les mutations dans le DOM
function observeDOMChanges() {
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(handleMutation);
  });

  // Configuration de l'observateur pour surveiller les ajouts d'enfants dans le corps du document
  observer.observe(document.body, { childList: true, subtree: true });
}

// Ajouter les contrôles aux vidéos existantes et supprimer les div au même niveau que chaque vidéo (sibling)
Array.from(document.querySelectorAll('video')).forEach(
  addControlsToVideo
);

// Observer les mutations pour détecter les nouvelles vidéos ajoutées dynamiquement
observeDOMChanges();
